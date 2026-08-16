const mysql = require("mysql2");

// Sử dụng createPool thay vì createConnection
// Cấu hình đọc từ biến môi trường (DB_HOST, DB_USER, ...) để deploy lên
// Vercel / kết nối TiDB Cloud. Giữ giá trị localhost mặc định khi chạy local.
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "quan_cafe",
    timezone: '+00:00',
    waitForConnections: true,
    // 5 thay vì 10: nhiều instance serverless (Vercel) cùng mở pool dễ vượt
    // giới hạn kết nối của TiDB Cloud serverless nếu để cao
    connectionLimit: 5,
    queueLimit: 0,
    // TiDB Cloud yêu cầu TLS: đặt DB_SSL=true trong biến môi trường
    ...(process.env.DB_SSL === "true" ? { ssl: { rejectUnauthorized: false } } : {})
});

// Đảm bảo múi giờ MySQL = UTC để NOW(), CURDATE() trả về giờ UTC
// Code xử lý + INTERVAL 7 HOUR ở Repository dựa trên UTC gốc
pool.on('connection', (conn) => {
  conn.execute("SET time_zone = '+00:00'");
  // MySQL 5.7 của project tắt ONLY_FULL_GROUP_BY mặc định; TiDB/MySQL 8 bật sẵn
  // và làm vỡ các query GROUP BY cũ — bỏ mode này trên mỗi phiên kết nối
  conn.execute("SET SESSION sql_mode = (SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''))");
});

// Xuất ra dạng promise để các Repository dùng được await db.execute()
module.exports = pool.promise();

console.log("MySQL Pool initialized ");