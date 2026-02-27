"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";
import { useLanguage } from "../i18n/LanguageContext";

export default function HeroMinimal() {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const isRTL = dir === "rtl";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center pt-28 sm:pt-24 lg:pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isRTL ? "direction-rtl" : ""}`}>
          {/* Content */}
          <div className={`text-center ${isRTL ? "lg:text-right lg:order-2" : "lg:text-left"}`}>
            {/* Main Headline */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {t("hero.headline")}{" "}
              <span className="text-green-600">{t("hero.headlineHighlight")}</span>
              <br />
              <span className="text-gray-500 text-3xl sm:text-4xl lg:text-5xl">{t("hero.subheadline")}</span>
            </h1>

            {/* Darija Tagline */}
            <p
              className={`text-lg text-amber-600 font-medium mb-5 ${
                isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
              }`}
              dir="rtl"
            >
              {t("hero.darijaTagline")}
            </p>

            {/* Quick value props - 3 compact items */}
            <div
              className={`flex flex-wrap justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} gap-4 mb-8 ${
                isVisible ? "animate-fade-in-up delay-150" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t("hero.trust1")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t("hero.trust2")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{t("hero.trust3")}</span>
              </div>
            </div>

            {/* Single strong CTA */}
            <div
              className={`flex flex-col sm:flex-row gap-3 justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} ${
                isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
              }`}
            >
              <a
                href="#contact"
                className="bg-green-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-green-700 flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {isRTL ? "سجّل الآن" : "Register Now"}
              </a>
            </div>

            {/* Trust badges */}
            <div
              className={`mt-6 flex flex-wrap justify-center ${isRTL ? "lg:justify-end" : "lg:justify-start"} gap-3 ${
                isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-1.5 bg-white border border-green-200 text-green-700 px-3 py-1.5 rounded-full shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-xs">{isRTL ? "ضمان استرداد 100%" : "100% Money Back"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-xs">{isRTL ? "دفع آمن" : "Secure Payment"}</span>
              </div>
            </div>
          </div>

          {/* Hero Image - clean, no floating badges */}
          <div
            className={`relative ${isRTL ? "lg:order-1" : ""} ${
              isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
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
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`text-center mt-8 ${isVisible ? "animate-fade-in-up delay-400" : "opacity-0"}`}>
          <a href="#contact" className="inline-flex flex-col items-center text-gray-400 hover:text-green-600 transition-colors">
            <span className="text-xs mb-1">{isRTL ? "سجّل أسفله" : "Register below"}</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
