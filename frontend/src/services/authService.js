import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const login = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  console.log("vào đây");
  // console.log(data);
  return res.data;
};

export const register = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  console.log("Trong file authServiec", data);

  return res.data;
};
