import React from "react";
import FeatureCard from "./FeatureCard";
import { FaChartLine, FaClock, FaFileInvoiceDollar } from "react-icons/fa";

const features = [
  { icon: <FaChartLine />, title: "Báo cáo trực quan", desc: "Biểu đồ rõ ràng, báo cáo tổng hợp dễ hiểu." },
  { icon: <FaFileInvoiceDollar />, title: "Hóa đơn & thanh toán", desc: "Tạo hóa đơn chuyên nghiệp và theo dõi thanh toán." },
  { icon: <FaClock />, title: "Theo dõi thời gian", desc: "Ghi nhận giao dịch và thời gian chuẩn xác." },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Tính năng nổi bật</h2>
      </div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, idx) => <FeatureCard key={idx} {...f} />)}
      </div>
    </section>
  );
}
