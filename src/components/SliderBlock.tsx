import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useSliderCursor } from "../hooks/useSliderCursor";

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
  const [isLandscape, setIsLandscape] = useState(true);

  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  // 🧩 Cursor Hook
  const { sliderRef, cursorX, cursorY, isLeftSide, handleMouseMove } =
    useSliderCursor();

  // 🖼 Landscape / Portrait detection
  useEffect(() => {
    const current = images[activeIndex];
    if (!current?.src) return;

    const img = new Image();
    img.src = current.src;
    img.onload = () => {
      setIsLandscape(img.naturalWidth > img.naturalHeight);
    };
  }, [activeIndex, images]);

  const handleClick = () => {
    if (isLeftSide) {
      prev();
    } else {
      next();
    }
  };

  if (!images || images.length === 0) return null;

  const current = images[activeIndex];

  return (
    <div
      ref={sliderRef}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className="slider"
    >
      <div className="slider__image-wrapper">
        <img
          src={current.src}
          alt={current.alt}
          className={`slider__image ${isLandscape ? "landscape" : "portrait"}`}
        />
        {current.caption && (
          <p className="slider__caption">{current.caption}</p>
        )}
      </div>

      {images.length > 1 && (
        <>
          {/* Cursor-Pfeil */}
          <div
            className="cursor-arrow"
            style={{
              left: cursorX,
              top: cursorY,
            }}
          >
            {isLeftSide ? <MdArrowBackIos /> : <MdArrowForwardIos />}
          </div>
        </>
      )}
    </div>
  );
}
