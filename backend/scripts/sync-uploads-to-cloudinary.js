/* ===== ĐỒNG BỘ ẢNH CŨ LÊN CLOUDINARY =====
 * Đọc bảng `mon`, tìm các ảnh local (uploads/anh-mon), upload từng file lên
 * Cloudinary (giữ nguyên tên file làm public_id), rồi cập nhật hinh_anh trong
 * DB thành URL Cloudinary để hưởng lợi biến thể tối ưu ảnh.
 *
 * Chạy thử trước khi thực hiện:
 *   node scripts/sync-uploads-to-cloudinary.js --dry-run
 * Chạy thật:
 *   node scripts/sync-uploads-to-cloudinary.js
 * ======================================== */
require("dotenv").config({ quiet: true });

const fs = require("fs");
const path = require("path");
const db = require("../db");
const { uploadImageBuffer } = require("../src/utils/cloudinaryImage");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads", "anh-mon");
const DRY_RUN = process.argv.includes("--dry-run");

/** Trích tên file local từ hinh_anh: "/uploads/anh-mon/x.png" hoặc "x.png" */
function extractLocalFilename(hinhAnh) {
  if (!hinhAnh || typeof hinhAnh !== "string") return null;
  if (hinhAnh.startsWith("data:") || hinhAnh.startsWith("http")) return null;
  if (hinhAnh.startsWith("/uploads/")) {
    const name = hinhAnh.split("/").pop();
    return name || null;
  }
  if (/^[A-Za-z0-9._-]+\.(png|jpe?g|gif|webp)$/i.test(hinhAnh)) return hinhAnh;
  return null;
}

async function main() {
  const [rows] = await db.query(
    "SELECT ma_mon, hinh_anh FROM mon WHERE hinh_anh IS NOT NULL AND hinh_anh <> '' AND hinh_anh <> '{}'"
  );

  // Gom theo tên file để mỗi file chỉ upload 1 lần
  const byFile = new Map(); // filename -> { mons: [ma_mon], url: null }
  const skipped = [];

  for (const r of rows) {
    const fname = extractLocalFilename(r.hinh_anh);
    if (!fname) {
      skipped.push({ ma_mon: r.ma_mon, reason: `không phải ảnh local (${r.hinh_anh})` });
      continue;
    }
    if (!fs.existsSync(path.join(UPLOAD_DIR, fname))) {
      skipped.push({ ma_mon: r.ma_mon, reason: `file không tồn tại: ${fname}` });
      continue;
    }
    if (!byFile.has(fname)) byFile.set(fname, { mons: [], url: null });
    byFile.get(fname).mons.push(r.ma_mon);
  }

  const totalMons = [...byFile.values()].reduce((s, v) => s + v.mons.length, 0);
  console.log(`Tìm thấy ${byFile.size} file ảnh local cho ${totalMons} món.`);

  for (const [fname, info] of byFile) {
    console.log(`  upload: ${fname} -> món ${info.mons.join(", ")}`);
  }
  for (const s of skipped) {
    console.log(`  bỏ qua món ${s.ma_mon}: ${s.reason}`);
  }

  if (DRY_RUN) {
    console.log("\nDRY RUN — không thay đổi dữ liệu.");
    await db.end();
    return;
  }

  // 1) Upload từng file lên Cloudinary
  let failCount = 0;
  for (const [fname, info] of byFile) {
    try {
      const buffer = fs.readFileSync(path.join(UPLOAD_DIR, fname));
      const publicId = path.basename(fname, path.extname(fname));
      info.url = await uploadImageBuffer(buffer, fname, publicId);
      console.log(`  ✓ đã upload ${fname} -> ${info.url}`);
    } catch (err) {
      failCount += 1;
      console.error(`  ✗ lỗi upload ${fname}: ${err.message}`);
    }
  }

  // 2) Cập nhật DB
  let updated = 0;
  for (const [fname, info] of byFile) {
    if (!info.url) continue; // file lỗi upload — giữ nguyên
    for (const maMon of info.mons) {
      await db.query("UPDATE mon SET hinh_anh = ? WHERE ma_mon = ?", [info.url, maMon]);
      updated += 1;
    }
  }

  console.log(`\nĐã cập nhật ${updated}/${totalMons} món trong DB.`);
  if (failCount) console.log(`Có ${failCount} file lỗi upload — chạy lại script để thử tiếp.`);
  await db.end();
}

main().catch((e) => {
  console.error("LỖI:", e.message);
  process.exit(1);
});
