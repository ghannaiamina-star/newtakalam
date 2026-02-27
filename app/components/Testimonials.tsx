"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTranslation } from "../i18n/useTranslation";

export default function Testimonials() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [videoTouchStart, setVideoTouchStart] = useState<number | null>(null);
  const [videoTouchEnd, setVideoTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance for a swipe to register
  const minSwipeDistance = 50;

  const testimonials = [
    {
      quote: t("testimonials.quote1"),
      name: t("testimonials.name1"),
      role: t("testimonials.role1"),
      location: t("testimonials.location1"),
      image: "/pexels-italo-melo-881954-2379004.jpg",
    },
    {
      quote: t("testimonials.quote2"),
      name: t("testimonials.name2"),
      role: t("testimonials.role2"),
      location: t("testimonials.location2"),
      image: "/pexels-mellamed-442447-1133742.jpg",
    },
    {
      quote: t("testimonials.quote3"),
      name: t("testimonials.name3"),
      role: t("testimonials.role3"),
      location: t("testimonials.location3"),
      image: "/pexels-estudiopolaroid-3116381.jpg",
    },
  ];

  const videoTestimonials = [
    { src: "/Pink & Purple Feminine Client Testimonial Instagram Reel (1).mp4" },
    { src: "/Pink & Purple Feminine Client Testimonial Instagram Reel (2).mp4" },
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

  // Swipe handlers for mobile carousel
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < testimonials.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToVideoSlide = useCallback((index: number) => {
    setCurrentVideoSlide(index);
  }, []);

  const nextVideo = useCallback(() => {
    setCurrentVideoSlide((prev) => (prev + 1) % videoTestimonials.length);
  }, []);

  const prevVideo = useCallback(() => {
    setCurrentVideoSlide((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  }, []);

  // Video swipe handlers
  const onVideoTouchStart = (e: React.TouchEvent) => {
    setVideoTouchEnd(null);
    setVideoTouchStart(e.targetTouches[0].clientX);
  };

  const onVideoTouchMove = (e: React.TouchEvent) => {
    setVideoTouchEnd(e.targetTouches[0].clientX);
  };

  const onVideoTouchEnd = () => {
    if (!videoTouchStart || !videoTouchEnd) return;
    const distance = videoTouchStart - videoTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextVideo();
    }
    if (isRightSwipe) {
      prevVideo();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t("testimonials.title")} <span className="text-green-600">{t("testimonials.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials - Swipeable on mobile, Grid on desktop */}
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            className="relative overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div
                    className={`card-hover bg-gray-50 rounded-2xl p-6 relative ${
                      isVisible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                  >
                    {/* Green accent */}
                    <div className="absolute top-0 left-8 w-12 h-1 bg-green-500 rounded-full"></div>
                    
                    {/* Quote Icon */}
                    <div className="mb-4 pt-4">
                      <svg
                        className="w-8 h-8 text-green-200"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {/* Quote */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-green-100">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-green-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Swipe hint */}
          <p className="text-center text-xs text-gray-400 mt-3">
            ← Swipe to see more →
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-hover bg-gray-50 rounded-2xl p-8 relative ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Green accent */}
              <div className="absolute top-0 left-8 w-12 h-1 bg-green-500 rounded-full"></div>
              
              {/* Quote Icon */}
              <div className="mb-6 pt-4">
                <svg
                  className="w-10 h-10 text-green-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-2 ring-green-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Carousel */}
        <div
          className={`mt-16 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t("testimonials.videoTitle")} <span className="text-green-600">{t("testimonials.videoTitleHighlight")}</span>
          </h3>
          
          {/* Video Carousel Container */}
          <div className="relative max-w-sm mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={prevVideo}
              className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 transition-all"
              aria-label="Previous video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextVideo}
              className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 transition-all"
              aria-label="Next video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel */}
            <div 
              className="overflow-hidden rounded-2xl"
              onTouchStart={onVideoTouchStart}
              onTouchMove={onVideoTouchMove}
              onTouchEnd={onVideoTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentVideoSlide * 100}%)` }}
              >
                {videoTestimonials.map((video, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-[9/16] max-h-[500px]">
                      <video
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="auto"
                        src={`${video.src}#t=0.001`}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {videoTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideoSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentVideoSlide === index
                      ? "bg-green-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

            {/* Swipe hint for mobile */}
            <p className="text-center text-xs text-gray-400 mt-3 sm:hidden">
              ← Swipe to see more →
            </p>
          </div>
        </div>

        {/* Trust badge */}
        <div
          className={`mt-12 text-center ${
            isVisible ? "animate-fade-in-up delay-500" : "opacity-0"
          }`}
        >
          <p className="text-gray-500 text-sm">
            {t("testimonials.trustBadge")}
          </p>
        </div>
      </div>
    </section>
  );
}
