// src/components/HeroSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="pt-24 pb-20 bg-gradient-to-r from-green-50 to-white">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Quản lý tài chính doanh nghiệp hiệu quả
          </h1>
          <p className="text-gray-700 mb-6">
            Tự động tổng hợp chi phí, theo dõi dòng tiền, và xuất báo cáo tài chính chỉ trong vài cú nhấp.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg"
          >
            Bắt đầu miễn phí
          </button>
        </motion.div>
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="http://localhost:3001/anhgohome.png"
            alt="Finance Dashboard illustration"
            className="w-full max-w-lg rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
