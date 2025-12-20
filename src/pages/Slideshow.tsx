// Slideshow.tsx
import { useEffect, useState } from "react";

interface SlideshowProps {
  totalImages: number;
  intervalMs?: number; // Geschwindigkeit
}

export function Slideshow({ totalImages, intervalMs = 100 }: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array von Bildpfaden generieren
  const images = Array.from({ length: totalImages }, (_, i) =>
    `/slideshow/${String(i + 1).padStart(3, "0")}.jpg`
  );

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [images, intervalMs]);

  console.log("Slidewhow Research rendered");
  
  return (
    <div className="slideshow-wrapper">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="slideshow-item"
      />
    </div>
  );
}
