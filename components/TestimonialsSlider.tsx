"use client";

import { useState, useEffect, useRef } from "react";
import { testimonialsData, Testimonial } from "@/lib/data";

export default function TestimonialsSlider() {
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

  const maxIndex = Math.max(0, testimonialsData.length - itemsPerView);

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
    }, 4000);

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
            aria-label="Sebelumnya"
            className="w-9 h-9 rounded-xl bg-[#081d36] border border-blue-400/30 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 hover:bg-blue-600/30 transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Berikutnya"
            className="w-9 h-9 rounded-xl bg-[#081d36] border border-blue-400/30 flex items-center justify-center text-blue-300 hover:text-white hover:border-cyan-400 hover:bg-blue-600/30 transition-all shadow-md active:scale-95"
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
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="px-2 shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="group h-full bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-500/30 hover:border-cyan-400/70 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/20 flex flex-col justify-between">
                <div>
                  {/* Rating Stars & Project Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex gap-1 text-yellow-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-current drop-shadow-[0_1px_4px_rgba(250,204,21,0.5)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {item.project && (
                      <span className="px-2 py-0.5 rounded-md bg-blue-950/70 border border-blue-400/25 text-[10px] font-bold text-cyan-300">
                        {item.project}
                      </span>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-blue-100 text-xs sm:text-sm leading-relaxed italic mb-5 line-clamp-4">
                    &quot;{item.testimonial}&quot;
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-3.5 border-t border-blue-400/20">
                  {item.avatar ? (
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-400/50 shadow-md shrink-0 bg-slate-900">
                      <img
                        src={item.avatar}
                        alt={item.clientName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xs shadow-md shrink-0">
                      {item.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm group-hover:text-cyan-300 transition-colors">
                      {item.clientName}
                    </div>
                    <div className="text-blue-300 text-[11px] font-medium">
                      {item.company}
                    </div>
                  </div>
                </div>
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
