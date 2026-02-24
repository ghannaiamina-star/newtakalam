"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

export default function WhyTakalam() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const differentiators = [
    {
      title: t("whyTakalam.diff1Title"),
      description: t("whyTakalam.diff1Desc"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: t("whyTakalam.diff2Title"),
      description: t("whyTakalam.diff2Desc"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: t("whyTakalam.diff3Title"),
      description: t("whyTakalam.diff3Desc"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: t("whyTakalam.diff4Title"),
      description: t("whyTakalam.diff4Desc"),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  const audiences = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t("whyTakalam.audience1Title"),
      description: t("whyTakalam.audience1Desc"),
      accent: t("whyTakalam.audience1Accent"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: t("whyTakalam.audience2Title"),
      description: t("whyTakalam.audience2Desc"),
      accent: t("whyTakalam.audience2Accent"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: t("whyTakalam.audience3Title"),
      description: t("whyTakalam.audience3Desc"),
      accent: t("whyTakalam.audience3Accent"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: t("whyTakalam.audience4Title"),
      description: t("whyTakalam.audience4Desc"),
      accent: t("whyTakalam.audience4Accent"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: t("whyTakalam.audience5Title"),
      description: t("whyTakalam.audience5Desc"),
      accent: t("whyTakalam.audience5Accent"),
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t("whyTakalam.audience6Title"),
      description: t("whyTakalam.audience6Desc"),
      accent: t("whyTakalam.audience6Accent"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-takalam"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("whyTakalam.title")} <span className="text-green-600">{t("whyTakalam.titleHighlight")}</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("whyTakalam.subtitle")}
          </p>
        </div>

        {/* Learner Image Gallery Strip */}
        <div
          className={`mb-12 ${isVisible ? "animate-fade-in-up delay-50" : "opacity-0"}`}
        >
          <div className="flex justify-center items-center gap-3 sm:gap-4 flex-wrap">
            {[
              { src: "/pexels-beardedbasturds-842980.jpg", alt: "Takalam English learner - professional student" },
              { src: "/pexels-simon-robben-55958-614810.jpg", alt: "Takalam English learner - confident speaker" },
              { src: "/pexels-mellamed-442447-1133742.jpg", alt: "Takalam English learner - business professional" },
              { src: "/pexels-italo-melo-881954-2379004.jpg", alt: "Takalam English learner - career focused" },
              { src: "/pexels-mattycphoto-1062280.jpg", alt: "Takalam English learner - motivated adult" },
              { src: "/pexels-minan1398-713312.jpg", alt: "Takalam English learner - aspiring communicator" },
            ].map((img, index) => (
              <div
                key={index}
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white hover:scale-110 hover:ring-green-200 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Key Differentiators - Compact Row */}
        <div
          className={`mb-16 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}
        >
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                    <p className="text-gray-600 text-xs">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience Section */}
        <div
          className={`text-center mb-10 ${
            isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t("whyTakalam.audienceTitle")} <span className="text-green-600">{t("whyTakalam.audienceTitleHighlight")}</span>?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t("whyTakalam.audienceSubtitle")}
          </p>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {audiences.map((item, index) => (
            <div
              key={index}
              className={`card-hover bg-gray-50 rounded-xl p-5 border border-gray-100 relative overflow-hidden ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 3) * 80}ms` }}
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400"></div>
              
              {/* Icon */}
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-3">
                {item.icon}
              </div>
              
              {/* Accent label */}
              <span className="inline-block text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full mb-2">
                {item.accent}
              </span>
              
              {/* Title */}
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                {item.title}
              </h4>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 ${
            isVisible ? "animate-fade-in-up delay-500" : "opacity-0"
          }`}
        >
          <p className="text-gray-600 mb-4">{t("whyTakalam.soundLikeYou")}</p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 btn-primary bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700"
          >
            {t("whyTakalam.viewPackages")}
            <svg className="w-5 h-5 rtl-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
