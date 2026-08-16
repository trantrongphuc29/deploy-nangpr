/* ===== ẢNH CLOUDINARY =====
 * Upload file buffer lên Cloudinary và xóa ảnh theo URL.
 * Dùng memoryStorage của multer nên không cần ghi file ra đĩa
 * (quan trọng khi chạy trên Vercel serverless - filesystem chỉ đọc).
 * ======================================== */
const cloudinary = require("../config/cloudinary");

const UPLOAD_FOLDER = "quan-cafe/anh-mon";

/** Upload buffer ảnh lên Cloudinary, trả về secure_url.
 * publicId tùy chọn: nếu truyền vào sẽ dùng đúng id đó (thích hợp đồng bộ
 * ảnh cũ — id trùng sẽ ghi đè asset cũ, URL giữ nguyên). */
const uploadImageBuffer = (buffer, originalname = "mon.png", publicId = null) => {
  return new Promise((resolve, reject) => {
    const finalPublicId = publicId || `mon-${Date.now()}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: UPLOAD_FOLDER,
        public_id: finalPublicId,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

/** Kiểm tra URL có phải của Cloudinary không */
const isCloudinaryUrl = (url) =>
  typeof url === "string" && url.includes("res.cloudinary.com");

/** Rút public_id từ secure_url của Cloudinary */
const publicIdFromUrl = (url) => {
  if (!isCloudinaryUrl(url)) return null;
  // https://res.cloudinary.com/<cloud>/image/upload/v<version>/<public_id>.<ext>
  const match = url.match(/\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i);
  return match ? decodeURIComponent(match[1]) : null;
};

/** Xóa ảnh trên Cloudinary theo URL (bỏ qua nếu không phải ảnh Cloudinary) */
const deleteCloudinaryImage = async (url) => {
  const publicId = publicIdFromUrl(url);
  if (!publicId) return false;
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (err) {
    console.error(`Không thể xóa ảnh Cloudinary: ${publicId}`, err.message);
    return false;
  }
};

module.exports = {
  uploadImageBuffer,
  isCloudinaryUrl,
  publicIdFromUrl,
  deleteCloudinaryImage,
};
