import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { register as registerUser } from "../../services/authService";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // console.log("vòa đây");
  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      console.log(data);
      // alert("Đăng ký thành công!");
    } catch (err) {
      alert("Đăng ký thất bại.");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Tên"
          name="name"
          placeholder="Nhập tên"
          register={register("name", { required: "Vui lòng nhập tên" })}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Nhập email"
          register={register("email", {
            required: "Email không được để trống",
          })}
          error={errors.email}
        />
        <Input
          label="Mật khẩu"
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
          register={register("password", {
            required: "Mật khẩu không được để trống",
          })}
          error={errors.password}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
