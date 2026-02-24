"use client";

import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="h-16 flex items-center mb-3">
              <Image
                src="/logo.png"
                alt="TAKALAM - The Moroccan English Center"
                width={1200}
                height={300}
                className="h-72 w-auto mx-auto md:mx-0 brightness-0 invert object-contain -my-24"
              />
            </div>
            <p className="text-sm max-w-xs mx-auto md:mx-0">
              {t("footer.description")}
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Programs</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/corporate" className="hover:text-green-400 transition-colors">
                Corporate English
              </a>
              <a href="/kids" className="hover:text-green-400 transition-colors">
                Kids English
              </a>
              <a href="/exams" className="hover:text-green-400 transition-colors">
                Exam Preparation
              </a>
              <a href="/ielts" className="hover:text-green-400 transition-colors">
                {t("footer.ielts")}
              </a>
              <a href="/business-english" className="hover:text-green-400 transition-colors">
                {t("footer.businessEnglish")}
              </a>
            </div>
          </div>

          {/* Sessions */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Sessions</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#private-pricing" className="hover:text-green-400 transition-colors">
                1-on-1 Sessions
              </a>
              <a href="#group-sessions" className="hover:text-green-400 transition-colors">
                Group Sessions
              </a>
              <a href="#how-it-works" className="hover:text-green-400 transition-colors">
                {t("footer.howItWorks")}
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Company</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/about" className="hover:text-green-400 transition-colors">
                {t("footer.about")}
              </a>
              <a href="/blog" className="hover:text-green-400 transition-colors">
                {t("footer.blog")}
              </a>
              <a href="/press" className="hover:text-green-400 transition-colors">
                Press & Media
              </a>
              <a href="/careers" className="hover:text-green-400 transition-colors">
                {t("footer.teachWithUs")}
              </a>
              <a href="#faq" className="hover:text-green-400 transition-colors">
                {t("footer.faq")}
              </a>
              <a href="#contact" className="hover:text-green-400 transition-colors">
                {t("footer.contact")}
              </a>
              <a href="/rules" className="hover:text-green-400 transition-colors">
                {t("footer.termsAndPolicies")}
              </a>
            </div>
          </div>
        </div>

        {/* Social & Contact */}
        <div className="flex justify-center gap-3 mt-8">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/takalamenglishcenter/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://web.facebook.com/takalamenglishcenter/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@takalamenglishcenter"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors group"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:takalamenglishcenter@gmail.com"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Emergency Contact */}
        <div className="text-center mb-6">
          <p className="text-xs text-gray-500 mb-2">{t("footer.urgentOnly")}</p>
          <a 
            href="tel:+212722774753" 
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +212 722 774 753
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© {currentYear} {t("footer.copyright")}</p>
          <p className="mt-2 text-gray-500">
            {t("footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
