// src/pages/Home.jsx
import React from "react";
import Navbar from "~/components/Home/Navbar";
import HeroSection from "~/components/Home/HeroSection";
import FeaturesSection from "~/components/Home/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}