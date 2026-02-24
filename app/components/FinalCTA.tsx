"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

export default function FinalCTA() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-green-700 relative overflow-hidden"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/online-class.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div
          className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Icon */}
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t("finalCta.headline")}
            <br />
            <span className="text-green-200">{t("finalCta.headlineHighlight")}</span>
          </h2>

          {/* Darija Tagline */}
          <p className="text-xl sm:text-2xl text-amber-300 font-medium mb-6" dir="rtl">
            {t("finalCta.darijaTagline")}
          </p>

          {/* Subtext */}
          <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto">
            {t("finalCta.subtext")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-3 bg-white text-green-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-green-50 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("finalCta.ctaPackages")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {t("finalCta.ctaRegister")}
            </a>
          </div>

          {/* Trust text */}
          <p className="mt-8 text-green-200 text-sm">
            {t("finalCta.trustText")}
          </p>


        </div>
      </div>
    </section>
  );
}
