/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X, Eye } from "lucide-react";
import { GALLERY } from "../data";
import { GalleryImage } from "../types";

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % GALLERY.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + GALLERY.length) % GALLERY.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-brand-bg px-6 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20 text-xs font-semibold">
          <Eye className="w-3.5 h-3.5" />
          Operaciones en Acción
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-text">
          Nuestro equipo en acción
        </h2>
        <p className="text-brand-muted max-w-2xl mx-auto text-sm md:text-base">
          Monitoreo, análisis y contención activa de incidentes de seguridad digital directamente desde el SOC.
        </p>
      </div>

      {/* Main Carousel Stage */}
      <div 
        className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-brand-border bg-brand-panel p-2 shadow-2xl shadow-black/40 group"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Slide Window */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-brand-bg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={GALLERY[currentIndex].url}
                alt={GALLERY[currentIndex].alt}
                className="w-full h-full object-cover select-none"
                onError={(e) => {
                  // If image files are not available yet on development container, fall back to high quality placeholders
                  const target = e.target as HTMLImageElement;
                  const colors = ["090d16", "1a2233", "0f1624", "0c101b"];
                  target.src = `https://images.unsplash.com/photo-${
                    currentIndex === 0 
                      ? "1563986768609-322da13575f3" // tech ops office
                      : currentIndex === 1
                      ? "1550751827-4bd374c3f58b" // server room
                      : currentIndex === 2
                      ? "1526374965328-7f61d4dc18c5" // monitor graph
                      : "1551808525-51a94da55020" // cybersecurity analyst
                  }?auto=format&fit=crop&w=1200&q=80`;
                }}
              />
              {/* Image Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 flex flex-col justify-end p-6 md:p-8" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Description Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-left z-10 pointer-events-none">
            <p className="text-[10px] md:text-xs font-mono text-brand-accent uppercase tracking-widest font-bold">
              Registro de Operaciones
            </p>
            <h3 className="text-lg md:text-2xl font-display font-bold text-brand-text mt-1">
              {GALLERY[currentIndex].alt}
            </h3>
            <p className="text-xs md:text-sm text-brand-muted mt-1 max-w-xl">
              {GALLERY[currentIndex].caption}
            </p>
          </div>

          {/* Lightbox Trigger Button */}
          <button
            onClick={() => setLightboxImage(GALLERY[currentIndex])}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-brand-accent hover:text-brand-bg text-brand-text rounded-full backdrop-blur-md border border-brand-border cursor-pointer transition-colors z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Ampliar imagen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Control Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-brand-accent hover:text-brand-bg text-brand-text rounded-full border border-brand-border backdrop-blur-md cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 z-20"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-brand-accent hover:text-brand-bg text-brand-text rounded-full border border-brand-border backdrop-blur-md cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-105 z-20"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators and Play/Pause Controller */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 text-brand-muted hover:text-brand-accent hover:bg-brand-panel rounded-full border border-brand-border/40 transition-colors cursor-pointer"
          title={isPlaying ? "Pausar reproducción automática" : "Activar reproducción automática"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2">
          {GALLERY.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === index ? "w-8 bg-brand-accent" : "w-2 bg-brand-border hover:bg-brand-muted/60"
              }`}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Grid view of thumbs below for easy access */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-brand-border/60">
        {GALLERY.map((image, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative rounded-xl overflow-hidden border cursor-pointer aspect-video transition-all duration-200 ${
              currentIndex === idx 
                ? "border-brand-accent ring-2 ring-brand-accent/20 scale-[1.02]" 
                : "border-brand-border hover:border-brand-muted/60 hover:scale-[1.01]"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://images.unsplash.com/photo-${
                  idx === 0 
                    ? "1563986768609-322da13575f3"
                    : idx === 1
                    ? "1550751827-4bd374c3f58b"
                    : idx === 2
                    ? "1526374965328-7f61d4dc18c5"
                    : "1551808525-51a94da55020"
                }?auto=format&fit=crop&w=250&q=80`;
              }}
            />
            {currentIndex !== idx && (
              <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors" />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Immersive Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            {/* Close touch trigger area */}
            <div className="absolute inset-0" onClick={() => setLightboxImage(null)} />

            {/* Content box */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative max-w-5xl w-full bg-brand-panel border border-brand-border rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-brand-accent hover:text-brand-bg text-brand-text rounded-full backdrop-blur-md border border-brand-border cursor-pointer transition-colors z-30"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[16/9] w-full bg-brand-bg">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const index = GALLERY.findIndex((img) => img.url === lightboxImage.url);
                    target.src = `https://images.unsplash.com/photo-${
                      index === 0 
                        ? "1563986768609-322da13575f3"
                        : index === 1
                        ? "1550751827-4bd374c3f58b"
                        : index === 2
                        ? "1526374965328-7f61d4dc18c5"
                        : "1551808525-51a94da55020"
                    }?auto=format&fit=crop&w=1200&q=80`;
                  }}
                />
              </div>

              <div className="p-6 md:p-8 bg-brand-panel border-t border-brand-border flex flex-col justify-end text-left">
                <span className="text-xs font-mono text-brand-accent uppercase tracking-widest font-bold">
                  Inspección SOC en Alta Resolución
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-brand-text mt-1">
                  {lightboxImage.alt}
                </h3>
                <p className="text-sm text-brand-muted mt-2">
                  {lightboxImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
