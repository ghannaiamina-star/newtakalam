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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#intro-video", label: t("header.meetTeacher") },
    { href: "#why-takalam", label: t("header.whyTakalam") },
    { href: "#private-sessions", label: t("header.privateSessions") },
    { href: "#group-sessions", label: t("header.groupSessions") },
    { href: "#faq", label: t("header.faq") },
    { href: "#contact", label: t("header.contact") },
  ];

  return (
    <>
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
          className="flex items-center justify-between py-2 pt-3 sm:pt-2"
          style={{ direction: "ltr" }}
        >
          {/* Logo - LEFT */}
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

          {/* Desktop Navigation - CENTER */}
          <nav 
            className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 flex-1 mx-4"
            style={{ direction: "ltr" }}
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-green-600 transition-colors text-sm xl:text-[15px] font-medium whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side - Language + CTA - RIGHT */}
          <div 
            className="hidden lg:flex items-center gap-3 flex-shrink-0"
            style={{ direction: "ltr" }}
          >
            <a
              href="/careers"
              className="text-green-600 hover:text-green-700 transition-colors text-sm font-medium whitespace-nowrap"
            >
              {t("header.becomeATutor")}
            </a>
            <LanguageSwitcher />
            <a
              href="#contact"
              className="bg-green-600 text-white px-4 xl:px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-sm whitespace-nowrap"
            >
              {t("header.getStarted")}
            </a>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav 
            id="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-100 py-4"
            style={{ direction: isRTL ? "rtl" : "ltr" }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-colors px-4 py-3 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/careers"
                className="text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors px-4 py-3 rounded-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("header.becomeATutor")}
              </a>
              <div className="px-4 py-3 border-t border-gray-100 mt-2">
                <LanguageSwitcher />
              </div>
              <div className="px-4 pt-2">
                <a
                  href="#contact"
                  className="block text-center bg-green-600 text-white px-5 py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("header.getStarted")}
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
    </>
  );
}
