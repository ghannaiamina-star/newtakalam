"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function About() {
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
      id="about"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div
            className={`${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-green-100 rounded-2xl"></div>
              
              {/* Main card */}
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                {/* Logo */}
                <div className="mb-6">
                  <Image
                    src="/logo.png"
                    alt="TAKALAM - The Moroccan English Center"
                    width={280}
                    height={80}
                    className="w-full max-w-[280px]"
                  />
                </div>
                
                <p className="text-green-600 font-medium text-lg">تكلم • Speak</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>Moroccan roots, global reach</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-green-600">Takalam</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Takalam is an English tutoring platform built on one simple belief: 
                <strong className="text-gray-800"> everyone can learn to speak English confidently</strong>.
              </p>
              
              <p>
                Founded by Said, a Moroccan English teacher, we bring together a team of 
                qualified tutors who focus on adults who already understand English but freeze 
                when it's time to speak. No textbook drills. No boring grammar exercises. 
                Just real conversations that build real confidence.
              </p>
              
              <p>
                Born in Morocco with a global mindset, Takalam understands the unique 
                challenges Arabic and French speakers face when learning English. Our tutors 
                meet you where you are and help you get where you want to be.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Expert tutors
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Speaking-first
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No judgment
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
