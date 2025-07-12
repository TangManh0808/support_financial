import { useState } from "react";
import useCompanyInfo from "~/hooks/dashboard/owner/settings/useCompanyInfo";
import useCompanyLogo from "~/hooks/dashboard/owner/settings/useCompanyLogo";

const CompanyInfo = () => {
  const { company, loading, error, updateCompany } = useCompanyInfo();
  const { logoUrl, uploadLogo } = useCompanyLogo();

  const [form, setForm] = useState({});
  const [logoFile, setLogoFile] = useState([]);
  const [preview, setPreview] = useState(null);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!company) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await updateCompany({ ...company, ...form });
    if (res.success) alert("Cập nhật thành công");
    else alert(res.error);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadLogo = async () => {
    if (!logoFile) return;
    const result = await uploadLogo(logoFile);
    if (result.success) {
      alert("Cập nhật logo thành công!");
      setPreview(null);
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Thông tin công ty</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form thông tin công ty */}
        <div className="space-y-4">
          <div>
            <label className="font-medium block mb-1">Tên công ty</label>
            <input
              type="text"
              name="name"
              defaultValue={company.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={company.email}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Địa chỉ</label>
            <input
              type="text"
              name="address"
              defaultValue={company.address}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              defaultValue={company.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lưu thông tin
          </button>
        </div>

        {/* Logo công ty */}
        <div className="pt-4 md:pt-0">
          <h3 className="font-bold mb-3 text-gray-700">Logo công ty</h3>
          {preview || logoUrl ? (
            <img
              src={preview || logoUrl}
              alt="Logo công ty"
              className="h-28 object-contain border rounded mb-4"
            />
          ) : (
            <p className="text-sm text-gray-500 mb-4">Chưa có logo</p>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="mb-4"
          />
          <button
            onClick={handleUploadLogo}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Cập nhật logo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
