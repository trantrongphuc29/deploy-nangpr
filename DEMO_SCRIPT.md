# Kịch bản demo — Hệ thống quản lý quán cà phê Nắng PR

> Hệ thống gồm **11 module** (theo menu bên trái) + bước **đăng nhập** ở đầu.
> Trình tự demo đi từ trên xuống dưới. Mở trình duyệt → vào trang web → bắt đầu.

---

## 0. Đăng nhập (bước vào hệ thống — không phải module)

- Mở trang web, hiển thị **màn hình đăng nhập** với logo Nắng PR.
- Nhập **tên đăng nhập + mật khẩu** (tài khoản admin đã cấu hình trong hệ thống), bấm **Đăng nhập**.
- Hệ thống kiểm tra đăng nhập, lưu phiên và chuyển vào trang **Dashboard**.
- Lưu ý: có nút chuyển **chế độ sáng/tối** ở góc trên phải.

---

## MODULE 1. Dashboard — Tổng quan

**Là gì:** Màn hình đầu tiên sau khi đăng nhập, tóm tắt tình hình kinh doanh trong ngày/tháng.

**Demo:**
1. Xem 4 chỉ số KPI chính:
   - **Doanh thu hôm nay** + số đơn hàng (kèm % tăng/giảm so với hôm qua).
   - **Doanh thu tháng** (kèm % so với tháng trước).
   - **Chi nhập kho tháng** (và hôm nay).
   - **Công nợ** tổng (số nhà cung cấp đang nợ, số phiếu nợ).
2. **Biểu đồ doanh thu theo ngày** — di chuột vào cột để xem doanh thu từng ngày; có đường trung bình và ngày cao nhất.
3. **Đơn hàng gần đây** — xem danh sách đơn hôm nay, bấm "Xem thêm" để mở rộng.
4. Cột bên phải: **Phân tích hôm nay** (tổng đơn, chia theo Tại chỗ / Mang về / Giao hàng), **Top món được gọi nhiều nhất**, **Top nhân viên theo giờ làm**, **Kho nguyên liệu** (cảnh báo sắp hết / hết hàng / sắp hết hạn).

---

## MODULE 2. Bán hàng (POS) — Bán tại quầy

**Là gì:** Màn hình bán hàng chính: chọn bàn → gọi món → in phiếu chế biến → thanh toán.

**Demo:**
1. Nhìn **sơ đồ bàn**: bàn trống (màu trắng, ghi "Trống"), bàn có khách (nổi bật, hiện số tiền đang phục vụ).
2. **Bấm vào bàn trống** → mở đơn mới, chọn món từ thực đơn bên phải (lọc theo danh mục).
3. Điều chỉnh số lượng (+/−), thêm **ghi chú món** (ít đường, không đá...).
4. Bấm **In món** → in **phiếu chế biến** xuống bếp, món chuyển trạng thái "đã in bar"; có thể **In lại phiếu bar** hoặc **hủy món** (in phiếu hủy).
5. Bấm **Thanh toán** → chọn **Tiền mặt hoặc Chuyển khoản** → tự động **in hóa đơn** (bill) và kết thúc đơn, bàn trở về trạng thái trống.
6. Demo thêm **Mang về** và **Giao hàng** (điền tên khách, SĐT, địa chỉ, phí giao hàng).
7. Tính năng phụ: **Đổi bàn** (chuyển đơn sang bàn khác khi đang phục vụ).

---

## MODULE 3. Doanh thu — Báo cáo bán hàng

**Là gì:** Tổng hợp doanh thu theo thời gian, xem chi tiết từng đơn hàng.

**Demo:**
1. Chọn khoảng thời gian: **Hôm nay / Tuần này / Tháng này / Năm nay** hoặc chọn **tự đặt ngày** từ–đến.
2. Xem 3 thẻ: **Doanh thu** (kèm % so với kỳ trước, đã gồm phí giao hàng), **Tiền mặt**, **Chuyển khoản**.
3. Xem **biểu đồ doanh thu** theo kỳ đã chọn.
4. Tab **Đơn hàng**: danh sách chi tiết (mã đơn, thời gian, bàn/loại, số món, tổng tiền, hình thức thanh toán) — bấm vào đơn để xem chi tiết, bấm nút **In hóa đơn**.
5. Lọc theo **loại đơn** (Tại chỗ/Mang về/Giao hàng) và **hình thức thanh toán**.
6. Tab **Món hủy**: theo dõi các món bị hủy trong kỳ.
7. Bấm **Xuất Excel** để tải toàn bộ đơn của kỳ đang lọc.

---

## MODULE 4. Công nợ — Theo dõi nợ nhà cung cấp

**Là gì:** Quản lý phiếu nhập kho và công nợ phải trả cho nhà cung cấp (NCC).

**Demo:**
1. Xem 3 thẻ chính: **Tổng công nợ**, **Công nợ trong kỳ**, **Đã thanh toán trong kỳ**.
2. Lọc theo thời gian (giống trang Doanh thu) + tìm kiếm theo từ khóa.
3. Tab **Phiếu nhập**: danh sách phiếu nhập kho; lọc theo trạng thái **Đang nợ / Đã thanh toán / Tất cả**.
4. Bấm vào phiếu đang nợ → xem chi tiết → bấm **Thanh toán công nợ** → hệ thống tự **in phiếu thanh toán**.
5. Tab **Phiếu thanh toán**: lịch sử các lần đã trả nợ (số lần, tổng đã trả).
6. Bấm **Xuất Excel** danh sách phiếu nhập.

---

## MODULE 5. Món & Công thức

**Là gì:** Quản lý danh sách món ăn/đồ uống kèm công thức pha chế (định mức nguyên liệu).

**Demo:**
1. Xem danh sách món, lọc theo **tab danh mục** (Cà phê, Trà, Nước ép...) và **tìm kiếm** theo tên/mã/giá.
2. Bấm **Thêm món mới** → nhập tên, danh mục, giá bán, ảnh món (tải lên Cloudinary).
3. Trong form món, khai báo **công thức**: chọn nguyên liệu + định lượng → hệ thống tự tính **giá vốn** món.
4. Sửa/xóa món: bấm vào món trong danh sách.
5. Điểm nổi bật: món **tự động bị khóa** (không bán được) khi nguyên liệu trong kho **hết hoặc hết hạn**.

---

## MODULE 6. Nguyên liệu — Quản lý kho

**Là gì:** Theo dõi tồn kho nguyên liệu, nhập kho, hủy hàng.

**Demo:**
1. Xem danh sách nguyên liệu: tồn kho, đơn vị, **ngưỡng cảnh báo**, **hạn sử dụng**, trạng thái (còn hàng / sắp hết / hết hàng).
2. Lọc theo **danh mục**, sắp xếp theo cột (ví dụ theo tồn kho).
3. Bấm **Thêm nguyên liệu** — đơn vị tự đổi theo danh mục (vd: nguyên liệu pha chế tính theo đơn vị nhỏ, hàng hóa theo đơn vị nhập).
4. Bấm **Nhập nguyên liệu** → thêm từng dòng nguyên liệu + số lượng + giá → lưu thành **phiếu nhập kho** (tự ghi nhận công nợ cho NCC nếu chưa trả).
5. **Hủy hàng**: chọn nguyên liệu hỏng/hết hạn → bấm **Hủy hàng**, in **phiếu hủy nguyên liệu**, xem **Lịch sử hủy**.
6. Bấm **Xuất Excel** danh sách nguyên liệu.

---

## MODULE 7. Nhân viên — Nhân sự & phân công ca

**Là gì:** Quản lý hồ sơ nhân viên và lịch phân công ca làm.

**Demo:**
1. Xem **Lịch phân công** dạng bảng **Tuần** (hoặc chuyển sang **Ngày**): các ca (Sáng/Chiều/Tối) × các ngày trong tuần; điều hướng tuần trước/sau, nút "Hôm nay".
2. Bấm dấu **+** trong ô ca → chọn ca + ngày → chọn 1 hoặc nhiều nhân viên → **Phân công**.
3. Bấm vào tên nhân viên trong ca → xem **Chi tiết nhân viên** (SĐT, ngày sinh, địa chỉ, trạng thái).
4. **Thêm nhân viên mới** (tên, ngày sinh dd/MM/yyyy, SĐT 10 số, địa chỉ).
5. **Sửa hồ sơ** / đổi **trạng thái** (Đang làm / Tạm nghỉ / Đã nghỉ) — khi chuyển sang nghỉ, hệ thống tự **gỡ khỏi các ca sắp tới**.
6. Bấm **In lịch** để in bảng phân công (tự động dàn trang ngang, ngắt trang theo hàng).
7. Ngày lễ hiển thị trên lịch với hệ số ×2, ×3...

---

## MODULE 8. Bảng công

**Là gì:** Tổng hợp giờ làm của nhân viên từ lịch phân công ca.

**Demo:**
1. Chọn **Tháng + Năm + Nhân viên** (hoặc "Tất cả nhân viên").
2. Xem 4 chỉ số: **Nhân viên có công**, **Tổng ca đã làm**, **Tổng giờ làm**, **Ca sáng/chiều/tối**.
3. Xem bảng chi tiết công từng nhân viên (số ca, tổng giờ, có mặt ở ca nào).
4. Góc phải hiển thị **trạng thái kỳ lương** (Chưa chốt / Đã chốt / Đã thanh toán) — bảng công liên kết trực tiếp với bảng lương.

---

## MODULE 9. Bảng lương

**Là gì:** Tính lương tháng từ bảng công + thưởng + khấu trừ + tạm ứng, rồi chốt và xuất file.

**Demo:**
1. Chọn **Tháng + Năm + Nhân viên**.
2. Xem bảng lương: lương giờ × số giờ làm, cộng **phụ cấp**, **thưởng**, trừ **khấu trừ / tạm ứng** → **thực nhận**.
3. Bấm vào một nhân viên → xem **Chi tiết lương** (cách tính từng khoản).
4. Khi kỳ còn mở: bấm **Chốt lương** → toàn bộ dữ liệu bị khóa.
5. Sau khi chốt: bấm **Đánh dấu đã thanh toán** (hoặc **Mở chốt** nếu cần sửa; nếu đã thanh toán thì **Hoàn tác thanh toán**).
6. Bấm **Xuất Excel** hoặc **Xuất PDF** bảng lương.
7. Lưu ý: kỳ lương đã chốt sẽ **khóa sửa lịch phân công** ở trang Nhân viên.

---

## MODULE 10. Cấu hình lương

**Là gì:** Thiết lập mức lương và phụ cấp cho từng nhân viên, quản lý ngày lễ.

**Demo:**
1. Xem danh sách nhân viên với các cột **Lương/giờ**, **Phụ cấp/tháng**, **Trạng thái**.
2. Chỉnh sửa trực tiếp trên bảng → nút hiện **"Lưu N thay đổi"** → bấm **Lưu cấu hình**.
3. Phần **Ngày lễ / hệ số lương**: thêm ngày lễ (ngày + tên + hệ số, vd ×2) — ngày lễ đó sẽ nhân đôi lương giờ khi tính công, và hiển thị trên lịch phân công.
4. Xóa ngày lễ khi không còn áp dụng.

---

## MODULE 11. Quản lý bàn

**Là gì:** Quản lý danh sách bàn phục vụ tại quán.

**Demo:**
1. Xem danh sách bàn dạng thẻ với trạng thái **Trống** (xanh) / **Đang phục vụ** (đỏ).
2. Bấm **Thêm bàn mới** → nhập tên bàn (vd: "Bàn 01") → thêm vào danh sách.
3. **Sửa** tên bàn (bấm nút Sửa trên thẻ).
4. **Xóa** bàn — bàn **đang phục vụ thì không xóa được** (nút bị khóa).
5. Tìm kiếm bàn theo tên (không phân biệt dấu).
6. Lưu ý: danh sách bàn này được dùng chung với màn hình **Bán hàng (POS)**.

---

## Kết thúc

- Bấm **Đăng xuất** ở cuối menu bên trái để kết thúc phiên demo.
- Gợi ý luồng demo hoàn chỉnh (kể chuyện):
  **Đăng nhập → Dashboard (nhìn tổng quan) → Bán hàng (tạo đơn, in phiếu, thanh toán) → Doanh thu (kiểm tra đơn vừa bán) → Món & công thức → Nguyên liệu (nhập kho) → Công nợ (trả nợ NCC) → Nhân viên (phân ca) → Bảng công → Bảng lương → Cấu hình lương → Quản lý bàn → Đăng xuất.**
