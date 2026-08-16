// Ở production (Vercel) frontend và backend cùng domain nên dùng đường dẫn tương đối;
// khi deploy tách riêng thì set REACT_APP_API_URL thành URL backend.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:3001");

const CLOUDINARY_TRANSFORM = "w_500,q_auto,f_auto";

/**
 * Thêm biến thể Cloudinary (thu nhỏ, nén thông minh, đổi định dạng tối ưu)
 * vào URL ảnh để web tải nhanh hơn. Bỏ qua nếu URL không phải của Cloudinary
 * hoặc đã có biến thể từ trước.
 */
export const cloudinaryImage = (img, transform = CLOUDINARY_TRANSFORM) => {
  if (typeof img !== "string") return img;
  // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
  const m = img.match(/^(https?:\/\/[^/]+\/[^/]+\/image\/upload\/)(.*)$/i);
  if (!m) return img;
  const rest = m[2];
  // Chỉ thêm biến thể khi URL còn nguyên (chưa có biến thể nào trước v<version>)
  if (!/^v\d+\//.test(rest)) return img;
  return `${m[1]}${transform}/${rest}`;
};

export const dishImage = (img) => {
  if (!img || img === "{}") return "";

  if (img.startsWith("data:")) return img;

  // Ảnh Cloudinary: áp dụng biến thể tối ưu trước khi trả về
  if (img.includes("res.cloudinary.com")) return cloudinaryImage(img);

  if (img.startsWith("http")) return img;

  if (img.startsWith("/uploads/")) {
    return `${API_BASE_URL}${img}`;
  }

  return `${API_BASE_URL}/uploads/anh-mon/${img}`;
};