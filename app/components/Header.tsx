"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "../i18n/useTranslation";
import { useLanguage } from "../i18n/LanguageContext";

export default function Header() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
      style={{ direction: "ltr" }}
    >
      <div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ direction: "ltr" }}
      >
        <div
          className="flex items-center justify-between py-2"
          style={{ direction: "ltr" }}
        >
          {/* Logo */}
          <div className="flex-shrink-0 -my-20 sm:-my-24 md:-my-26 lg:-my-28">
            <a href="#">
              <Image
                src="/logo.png"
                alt="TAKALAM"
                width={1200}
                height={300}
                className="h-56 sm:h-64 md:h-72 lg:h-80 w-auto"
                priority
              />
            </a>
          </div>

          {/* Right Side - Language + CTA */}
          <div
            className="flex items-center gap-3"
            style={{ direction: "ltr" }}
          >
            <LanguageSwitcher />
            <a
              href="#contact"
              className="bg-green-600 text-white px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap"
            >
              {t("header.getStarted")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
