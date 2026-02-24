"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-40 sm:pt-36 lg:pt-48 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "direction-rtl" : ""}`}>
          {/* Content */}
          <div className={`text-center ${isRTL ? "lg:text-right lg:order-2" : "lg:text-left"}`}>
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t("hero.badge")}
            </div>

            {/* Main Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 ${
                isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
              }`}
            >
              {t("hero.headline")}{" "}
              <span className="text-green-600">{t("hero.headlineHighlight")}</span>
              <br />
              <span className="text-gray-500 text-3xl sm:text-4xl lg:text-5xl">{t("hero.subheadline")}</span>
            </h1>

            {/* Darija Tagline */}
            <p
              className={`text-lg sm:text-xl text-amber-600 font-medium mb-6 ${
                isVisible ? "animate-fade-in-up delay-150" : "opacity-0"
              }`}
              dir="rtl"
            >
              {t("hero.darijaTagline")}
            </p>

            {/* Subheadline */}
            <p
              className={`text-lg sm:text-xl text-gray-600 max-w-xl mx-auto ${isRTL ? "lg:mr-0 lg:ml-auto" : "lg:mx-0"} mb-10 leading-relaxed ${
                isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
              }`}
            >
              {t("hero.description")}
            </p>

            {/* Split CTAs - Equal weight for both options */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} ${
                isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
              }`}
            >
              <a
                href="#private-sessions"
                className="btn-primary bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {t("hero.cta1on1")}
              </a>
              <a
                href="#group-sessions"
                className="btn-primary bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {t("hero.ctaGroup")}
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className={`mt-12 flex flex-wrap justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} gap-6 text-gray-500 text-sm ${
                isVisible ? "animate-fade-in-up delay-400" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.trust1")}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.trust2")}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t("hero.trust3")}
              </div>
            </div>

            {/* Student Count & Trust Badges */}
            <div
              className={`mt-8 flex flex-wrap justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} gap-4 ${
                isVisible ? "animate-fade-in-up delay-500" : "opacity-0"
              }`}
            >
              {/* Student Count Badge */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="font-bold">500+</span>
                <span className="text-green-100 text-sm">{isRTL ? "طالب سعيد" : "Happy Students"}</span>
              </div>
              
              {/* Money Back Guarantee */}
              <div className="flex items-center gap-2 bg-white border-2 border-green-200 text-green-700 px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-sm">{isRTL ? "ضمان استرداد 100%" : "100% Money Back"}</span>
              </div>

              {/* Secure Payment */}
              <div className="flex items-center gap-2 bg-white border-2 border-blue-200 text-blue-700 px-4 py-2 rounded-full shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-sm">{isRTL ? "دفع آمن" : "Secure Payment"}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative ${isRTL ? "lg:order-1" : ""} ${
              isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative background elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
              
              {/* Image frame */}
              <div className="relative bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-3 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white">
                  <Image
                    src="/herosectionpic.jpg"
                    alt="Student in a 1-on-1 online English lesson with Takalam"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                    fetchPriority="high"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t("hero.badge1Title")}</p>
                    <p className="text-xs text-gray-500">{t("hero.badge1Subtitle")}</p>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t("hero.badge2Title")}</p>
                    <p className="text-xs text-gray-500">{t("hero.badge2Subtitle")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
