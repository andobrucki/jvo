import React, { useState } from "react";

type Image = {
  src: string;
  alt: string;
  caption?: string;
};

type SliderBlockProps = {
  images: Image[];
};

export default function SliderBlock({ images }: SliderBlockProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  if (!images || images.length === 0) return null;

  const current = images[activeIndex];

  return (
    <div className="slider-block">
      <div className="slider-image-wrapper">
        <img src={current.src} alt={current.alt} className="slider-image" />
        {current.caption && (
          <p className="slider-caption">{current.caption}</p>
        )}
      </div>
      <button className="slider-prev" onClick={prev}>‹</button>
      <button className="slider-next" onClick={next}>›</button>
    </div>
  );
}
