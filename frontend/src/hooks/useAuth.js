// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export const useAuth = () => {
  // console.log("vòa useAuth rồi");
  return useContext(AuthContext);
};
