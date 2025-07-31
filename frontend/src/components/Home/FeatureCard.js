import React from "react";
export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start space-y-4 hover:shadow-lg transition">
      <div className="text-green-500 text-3xl">{icon}</div>
      <h3 className="font-semibold text-xl text-gray-800">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
