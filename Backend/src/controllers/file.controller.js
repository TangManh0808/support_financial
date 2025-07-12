const fileService = require("../services/file.service");

/**
 * 📁 Upload một tệp thông thường
 */
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { file_type } = req.body;
    console.log(req.file);


    if (!file) {
      return res.status(400).json({ message: "Không có file được gửi lên" });
    }

    const result = await fileService.saveFile({
      company_id: req.user.company_id,
      user_id: req.user.id,
      file,
      file_type,
    });

    console.log(result);

    res.json({ message: "Tải tệp thành công", data: result });
  } catch (error) {
    console.error("Lỗi upload file:", error);
    res.status(500).json({ message: "Lỗi tải tệp", error: error.message });
  }
};

/**
 * 📥 Upload logo công ty (chỉ lưu một logo, ghi đè)
 */
exports.uploadCompanyLogo = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Không có file được gửi lên" });
    }

    // Xoá logo cũ (nếu có)
    await fileService.deleteLogo(req.user.company_id);

    const result = await fileService.saveFile({
      company_id: req.user.company_id,
      user_id: req.user.id,
      file,
      file_type: "logo",
    });

    res.json({ message: "Logo công ty đã được cập nhật", data: result });
  } catch (error) {
    console.error("Lỗi cập nhật logo:", error);
    res
      .status(500)
      .json({ message: "Lỗi cập nhật logo", error: error.message });
  }
};

/**
 * 📄 Lấy toàn bộ tệp của công ty
 */
exports.getAllFiles = async (req, res) => {
  try {
    const files = await fileService.getFilesByCompany(req.user.company_id);
    res.json(files);
  } catch (error) {
    console.error("Lỗi lấy danh sách tệp:", error);
    res
      .status(500)
      .json({ message: "Lỗi lấy danh sách tệp", error: error.message });
  }
};

/**
 * 🔍 Lấy chi tiết một file theo ID (kiểm tra quyền)
 */
exports.getFileById = async (req, res) => {
  try {
    const file = await fileService.getFileById(req.params.id);
    if (!file || file.company_id !== req.user.company_id) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập file này" });
    }
    res.json(file);
  } catch (error) {
    console.error("Lỗi khi lấy file:", error);
    res.status(500).json({ message: "Lỗi lấy file", error: error.message });
  }
};

/**
 * 🗑 Xoá file theo ID
 */
exports.deleteFile = async (req, res) => {
  try {
    const result = await fileService.deleteFile(
      req.params.id,
      req.user.company_id
    );
    res.json({ message: "Xoá tệp thành công", result });
  } catch (error) {
    console.error("Lỗi xoá file:", error);
    res.status(500).json({ message: "Lỗi xoá tệp", error: error.message });
  }
};

/**
 * 🖼 Lấy logo hiện tại của công ty
 */
exports.getCompanyLogo = async (req, res) => {
  try {
    const logo = await fileService.getLogo(req.user.company_id);
    if (!logo) {
      return res.status(404).json({ message: "Chưa có logo nào được tải lên" });
    }
    res.json(logo);
  } catch (error) {
    console.error("Lỗi khi lấy logo:", error);
    res.status(500).json({ message: "Lỗi lấy logo", error: error.message });
  }
};
