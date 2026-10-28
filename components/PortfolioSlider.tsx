"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { portfolioData, Portfolio } from "@/lib/data";

const CATEGORIES = [
  { id: "all", label: "Semua Kategori" },
  { id: "web", label: "Web App & E-Commerce" },
  { id: "system", label: "Enterprise System" },
  { id: "iot", label: "IoT & Otomasi" },
];

export default function PortfolioSlider() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Filter items based on category
  const filteredItems: Portfolio[] = portfolioData.filter((item) => {
    if (selectedCategory === "all") return true;
    const cat = item.category.toLowerCase();
    if (selectedCategory === "web") {
      return (
        cat.includes("web") ||
        cat.includes("commerce") ||
        cat.includes("pos") ||
        cat.includes("directory")
      );
    }
    if (selectedCategory === "system") {
      return (
        cat.includes("enterprise") ||
        cat.includes("system") ||
        cat.includes("hr") ||
        cat.includes("software")
      );
    }
    if (selectedCategory === "iot") {
      return cat.includes("iot") || cat.includes("automation") || cat.includes("hardware");
    }
    return true;
  });

  // Calculate items per view
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

  const maxIndex = Math.max(0, filteredItems.length - itemsPerView);

  // Reset index when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
  };

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
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, selectedCategory]);

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
      {/* Category Tabs & Controls Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-400 shadow-md shadow-blue-500/30 scale-105"
                    : "bg-[#081d36]/80 text-blue-200 border-blue-400/20 hover:border-blue-400/50 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous portfolio project"
            className="w-9 h-9 rounded-xl bg-[#081d36] border border-blue-400/30 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-600/30 transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next portfolio project"
            className="w-9 h-9 rounded-xl bg-[#081d36] border border-blue-400/30 flex items-center justify-center text-blue-300 hover:text-white hover:border-blue-400 hover:bg-blue-600/30 transition-all shadow-md active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border border-blue-400/20 bg-[#081d36]/40 text-blue-300">
          <p className="text-sm font-medium">Belum ada portofolio untuk kategori ini.</p>
        </div>
      ) : (
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
            {filteredItems.map((project) => (
              <div
                key={project.id}
                className="px-2 shrink-0 flex flex-col"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="group h-full bg-gradient-to-b from-[#0a274d] to-[#04152d] border border-blue-500/30 hover:border-cyan-400/70 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/20 flex flex-col justify-between min-h-[430px]">
                  <div>
                    {/* Photo Thumbnail Container */}
                    <div className="relative h-44 sm:h-48 w-full bg-[#020611] overflow-hidden border-b border-blue-400/20">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/assets/images/hero-art.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04152d] via-transparent to-transparent opacity-80" />
                      
                      {/* Category Badge Floating Top Left */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#031226]/85 backdrop-blur-md border border-blue-400/40 text-cyan-300 text-[10px] font-extrabold uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      {/* Client / Status Tag Bottom Left */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-blue-200">
                        <span className="truncate pr-2">{project.client}</span>
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 min-h-[48px] sm:min-h-[52px] leading-snug">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 min-h-[36px]">
                        {project.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Footer with Tech Stack and Link */}
                  <div className="p-4 sm:p-5 pt-0">
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-400/25 text-[10px] font-medium text-blue-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/portfolio/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
                    >
                      Detail Studi Kasus
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
