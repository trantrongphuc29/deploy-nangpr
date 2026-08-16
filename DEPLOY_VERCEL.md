# Deploy lên Vercel — Hướng dẫn chi tiết

Ứng dụng gồm 2 phần trong 1 repo monorepo:
- `frontend/` — React (Create React App), build tĩnh
- `backend/` — Node.js + Express, chạy như serverless function

Cấu hình `vercel.json` ở root đã lo phần định tuyến:
- `/api/*` và `/uploads/*` → backend
- mọi path khác → frontend

---

## Bước 1 — Đẩy code lên GitHub

```bash
git add -A
git commit -m "Prepare Vercel deployment"
git push origin main
```

> ⚠️ Đảm bảo `backend/.env` **không** nằm trong commit (đã có trong `.gitignore`).
> Mật khẩu TiDB và API Secret Cloudinary chỉ set qua Vercel dashboard hoặc CLI.

## Bước 2 — Import dự án vào Vercel

1. Vào https://vercel.com → **Add New Project** → **Import** repo GitHub của bạn
2. Nếu chưa liên kết GitHub, bấm **Install** Vercel app vào GitHub trước
3. Ở màn hình cấu hình:
   - **Framework Preset**: để **Other** (Vercel tự đọc `vercel.json`)
   - **Root Directory**: để mặc định (`.` — root repo)
   - **Build Command / Output**: để trống — `vercel.json` đã định nghĩa sẵn
4. **Chưa bấm Deploy** — set biến môi trường trước (bước 3)

## Bước 3 — Set biến môi trường

Mở tab **Environment Variables**, tạo **3 bộ môi trường**: `Production`, `Preview`, `Development`
(nhấn **Add** để thêm nhiều biến cùng lúc; bấm vào ô **Environment** để chọn cả 3).

| Biến | Giá trị | Ghi chú |
|---|---|---|
| `DB_HOST` | `gateway01.ap-southeast-1.prod.aws.tidbcloud.com` | TiDB Cloud |
| `DB_PORT` | `4000` | |
| `DB_USER` | `2DPuxCZ8MqgJqSu.root` | |
| `DB_PASSWORD` | *(mật khẩu TiDB thật — xem `backend/.env`)* | **Không để trong file công khai** |
| `DB_NAME` | `quan_cafe` | |
| `DB_SSL` | `true` | TiDB Cloud yêu cầu TLS |
| `CLOUDINARY_CLOUD_NAME` | `deeoz7atz` | |
| `CLOUDINARY_API_KEY` | `638675351315877` | |
| `CLOUDINARY_API_SECRET` | *(xem `backend/.env`)* | |
| `SECRET_KEY` | một chuỗi ngẫu nhiên dài | Ví dụ: `openssl rand -hex 32` |

> **Không cần** `REACT_APP_API_URL`: ở production, frontend gọi API cùng domain
> (đường dẫn tương đối), Vercel tự route `/api/*` về backend.

## Bước 4 — Deploy

- Bấm **Deploy** — Vercel sẽ:
  1. `npm install` + `npm run build` trong `frontend/` → output `build/`
  2. Đóng gói `api/index.js` (wrapper trỏ tới `backend/src/app.js`) thành serverless function
  3. Nạp rewrites từ `vercel.json` (file tĩnh ưu tiên trước, SPA fallback sau)
- Xong: vào **Deployments** → mở URL `https://<project>.vercel.app`

## Bước 5 — Kiểm tra

- Mở `https://<project>.vercel.app` → thấy trang đăng nhập
- Thử API: mở `https://<project>.vercel.app/api/mon` trong tab mới → phải trả JSON danh sách món
- Đăng nhập bằng tài khoản admin (`admin` / mật khẩu hiện có trong DB)
- Kiểm tra ảnh món tải nhanh (đã qua Cloudinary `w_500,q_auto,f_auto`)

## Deploy bằng CLI (tuỳ chọn)

```bash
npm i -g vercel
vercel login
vercel --prod          # chạy ở root dự án
```

Nếu dùng CLI, set env bằng:
```bash
vercel env add DB_HOST production
vercel env add DB_PASSWORD production
# ... lặp lại cho từng biến, rồi:
vercel --prod
```

---

## Cập nhật sau này

Mỗi lần `git push` lên `main`, Vercel tự deploy bản Production mới.
Deploy thử trước khi lên production: tạo Pull Request — Vercel tự tạo preview URL.

---

## Xử lý sự cố

| Lỗi | Cách xử lý |
|---|---|
| Build fail `@vercel/static-build` | Vào Project → **Settings** → **General** → đặt **Node.js Version = 20.x**, redeploy |
| Request API mất 3–5s đầu | Bình thường — cold start serverless; các request sau nhanh |
| Lỗi `Too many connections` từ TiDB | Đã đặt `connectionLimit: 5`; nếu vẫn lỗi, giảm xuống 2–3 hoặc nâng gói TiDB |
| Ảnh `/uploads/...` cũ hiển thị ảnh vỡ | Ảnh cũ đã đồng bộ lên Cloudinary; nếu món nào còn path local, chạy lại `node backend/scripts/sync-uploads-to-cloudinary.js` |
| Function timeout (>60s) | Report nặng có thể quá giới hạn; tối ưu query hoặc dùng `maxDuration` cao hơn (gói Pro) |
| `DB_SSL` không kết nối được | Kiểm tra lại mật khẩu trong Vercel env; thử `DB_SSL=false` chỉ để gỡ lỗi (không nên giữ) |

## Ghi chú giới hạn

- **Serverless = không lưu file**: mọi ảnh upload đã chuyển sang Cloudinary nên không bị ảnh hưởng.
- **Hobby plan**: function tối đa 60s (`maxDuration` đã set), 100 deploy/ngày, không domain tùy chỉnh ssl — đủ dùng cho giai đoạn đầu.
