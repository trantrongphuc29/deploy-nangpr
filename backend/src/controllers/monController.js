/* =====  MÓN CÔNG THỨC  =====
 * Tiếp nhận request HTTP cho module Món & Công thức
 * ============================================== */
const MonService = require("../services/monService");
const fs = require("fs");
const path = require("path");
const {
  uploadImageBuffer,
  isCloudinaryUrl,
  deleteCloudinaryImage,
} = require("../utils/cloudinaryImage");

/** Xóa ảnh cũ: file cục bộ thì xóa khỏi đĩa, URL Cloudinary thì xóa trên cloud */
const deleteImageFile = async (hinhAnh) => {
  if (!hinhAnh || typeof hinhAnh !== "string") return;

  // Xóa ảnh trên Cloudinary
  if (isCloudinaryUrl(hinhAnh)) {
    await deleteCloudinaryImage(hinhAnh);
    return;
  }

  // Chỉ xóa nếu là đường dẫn file local (không xóa base64 hay URL ngoài)
  if (hinhAnh.startsWith("/uploads/")) {
    // Strip leading / để path.join hoạt động đúng trên Windows (tránh resolve từ drive root)
    const relativePath = hinhAnh.replace(/^\//, "");
    const filePath = path.join(__dirname, "../..", relativePath);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`Đã xóa ảnh cũ: ${filePath}`);
      } catch (err) {
        console.error(`Không thể xóa ảnh cũ: ${filePath}`, err.message);
      }
    }
  }
};

const MonController = {
  getAll: async (req, res) => {
    try {
      const data = await MonService.getDanhSachMon();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryList: async (req, res) => {
    try {
      const data = await MonService.getDanhMucMenu();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const body = { ...req.body };

      if (req.file) {
        // Upload ảnh lên Cloudinary, lưu secure_url vào DB
        body.hinh_anh = await uploadImageBuffer(req.file.buffer, req.file.originalname);
      } else {
        body.hinh_anh = null;
      }

      const id = await MonService.themMonMoi(body);

      res.status(201).json({
        id,
        message: "Tạo món nước thành công!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const ma_mon = parseInt(req.params.id, 10);
      const body = { ...req.body };

      // Lấy thông tin món cũ trước khi cập nhật (để xóa ảnh cũ sau này)
      const currentMon = await MonService.getMonById(ma_mon);

      if (req.file) {
        // Upload ảnh mới lên Cloudinary
        body.hinh_anh = await uploadImageBuffer(req.file.buffer, req.file.originalname);

        // Xóa ảnh cũ (local hoặc Cloudinary) nếu có upload ảnh mới
        if (currentMon && currentMon.hinh_anh) {
          await deleteImageFile(currentMon.hinh_anh);
        }
      } else {
        const oldImage = req.body.hinh_anh_cu || req.body.hinh_anh || null;
        body.hinh_anh = oldImage === "{}" ? null : oldImage;
      }

      await MonService.capNhatMon(ma_mon, body);

      res.json({
        message: "Cập nhật món thành công!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const ma_mon = parseInt(req.params.id, 10);

      // Lấy thông tin món để xóa ảnh sau khi xóa record
      const mon = await MonService.getMonById(ma_mon);

      await MonService.xoaMon(ma_mon);

      // Xóa ảnh (file local hoặc Cloudinary)
      if (mon && mon.hinh_anh) {
        await deleteImageFile(mon.hinh_anh);
      }

      res.json({
        message: "Đã xóa món nước khỏi thực đơn hệ thống!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getMenuPos: async (req, res) => {
    try {
      const data = await MonService.getMenuPos();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  sellDish: async (req, res) => {
    try {
      const { ma_mon, so_luong } = req.body;

      await MonService.truKhoKhiBanHang(
        parseInt(ma_mon, 10),
        parseFloat(so_luong)
      );

      res.json({
        message: " Đã xuất kho pha chế và trừ vật tư thành công!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getCongThuc: async (req, res) => {
    try {
      const data = await MonService.getCongThuc(
        parseInt(req.params.id, 10)
      );

      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  saveCongThuc: async (req, res) => {
    try {
      await MonService.saveCongThuc(
        parseInt(req.params.id, 10),
        req.body.cong_thuc || []
      );

      res.json({
        message: " Cập nhật công thức thành công!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = MonController;