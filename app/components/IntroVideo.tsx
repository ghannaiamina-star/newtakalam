"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

export default function IntroVideo() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  // Video configuration - easily swappable
  const videoConfig = {
    // Options: 'local', 'youtube', 'vimeo', or 'none'
    type: 'youtube' as 'local' | 'youtube' | 'vimeo' | 'none',
    // For local: '/video.mp4'
    // For YouTube: video ID like 'dQw4w9WgXcQ'
    // For Vimeo: video ID like '123456789'
    src: 'E7CoSjerBKE',
    // Thumbnail/poster image
    poster: 'https://img.youtube.com/vi/E7CoSjerBKE/maxresdefault.jpg',
  };

  const handlePlayClick = () => {
    if (videoConfig.type !== 'none' && videoConfig.src) {
      setIsPlaying(true);
    }
  };

  const renderVideoPlayer = () => {
    // Show thumbnail with play button overlay
    if (!isPlaying) {
      return (
        <div 
          className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-green-500 shadow-xl ${
            videoConfig.type !== 'none' && videoConfig.src ? 'cursor-pointer group' : ''
          }`}
          onClick={handlePlayClick}
        >
          {/* Thumbnail Image */}
          <Image
            src={videoConfig.poster}
            alt="Welcome to Takalam English"
            fill
            className="object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-20 h-20 bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 ${
              videoConfig.type !== 'none' && videoConfig.src ? 'group-hover:scale-110' : ''
            }`}>
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="font-semibold">{t("introVideo.watchVideo")}</p>
            <p className="text-sm text-white/80">{t("introVideo.videoDuration")}</p>
          </div>

          {/* Coming soon badge if no video */}
          {(videoConfig.type === 'none' || !videoConfig.src) && (
            <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {t("introVideo.videoComingSoon")}
            </div>
          )}
        </div>
      );
    }

    // Render actual video player when playing
    if (videoConfig.type === 'youtube') {
      return (
        <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-green-500 shadow-xl">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoConfig.src}?autoplay=1&rel=0`}
            title="Welcome to Takalam - Introduction Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    if (videoConfig.type === 'vimeo') {
      return (
        <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-green-500 shadow-xl">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://player.vimeo.com/video/${videoConfig.src}?autoplay=1`}
            title="Welcome to Takalam - Introduction Video"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // Local video
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-green-500 shadow-xl">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoConfig.src}
          controls
          autoPlay
          poster={videoConfig.poster}
        />
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="intro-video"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {t("introVideo.title")} <span className="text-green-600">{t("introVideo.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-500 font-arabic">{t("introVideo.arabicSubtitle")}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Video Player */}
          <div
            className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
          >
            {renderVideoPlayer()}
          </div>

          {/* Right: Information */}
          <div
            className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
          >
            <div className="space-y-6">
              {/* Who I Am */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t("introVideo.whoIAm")}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t("introVideo.whoIAmText")}
                  </p>
                </div>
              </div>

              {/* Who This Is For */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t("introVideo.whoThisIsFor")}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t("introVideo.whoThisIsForText")}
                  </p>
                </div>
              </div>

              {/* What Makes Us Different */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t("introVideo.whatMakesDifferent")}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t("introVideo.whatMakesDifferentText")}
                  </p>
                </div>
              </div>

              {/* Reassurance */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t("introVideo.noPressure")}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t("introVideo.noPressureText")}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t("introVideo.cta")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
