// Slideshow.tsx
import { useEffect, useState } from "react";

interface DiashowProps {
  totalImages: number;
  intervalMs?: number; // Geschwindigkeit
}

export function ResearchDiashow({ totalImages, intervalMs = 600 }: DiashowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array von Bildpfaden generieren
  const images = Array.from({ length: totalImages }, (_, i) =>
    `/diashow/${String(i + 1).padStart(3, "0")}.jpg`
  );

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [images, intervalMs]);

  return (
    <div className="diashow-wrapper">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="diashow-item"
      />
    </div>
  );
}
