"use client";

import { useState, useEffect, useRef } from "react";
import { teamData } from "@/lib/data";

export default function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, teamData.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-slide effect
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3600);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (diff > 50) {
        nextSlide();
      } else if (diff < -50) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-blue-300 font-medium">
          Menggeser otomatis • Arahkan kursor untuk menjeda
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous team member"
            className="w-9 h-9 rounded-xl bg-[#081d36] border border-blue-400/30 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-600/30 transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next team member"
            className="w-9 h-9 rounded-xl bg-[#081d36] border border-blue-400/30 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-600/30 transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {teamData.map((member) => (
            <div
              key={member.id}
              className="px-2 shrink-0 flex flex-col"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="group h-full bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-500/30 hover:border-cyan-400/70 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/20 flex flex-col justify-between min-h-[300px]">
                <div>
                  {/* Photo Container */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/20 shrink-0 bg-[#020611]">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-black text-cyan-300 bg-blue-900/60">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                        {member.position}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 min-h-[54px] mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Skills Chips */}
                {member.skills && (
                  <div className="mt-auto pt-3 border-t border-blue-400/20">
                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2">
                      Keahlian Utama:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-400/20 text-[10px] font-medium text-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators (Dots) */}
      {maxIndex > 0 && (
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {[...Array(maxIndex + 1)].map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? "w-7 bg-cyan-400 shadow-sm shadow-cyan-400/50"
                  : "w-2 bg-blue-900/60 hover:bg-blue-400/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
