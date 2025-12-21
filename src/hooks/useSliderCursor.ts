import { useEffect, useRef, useState } from "react";

export function useSliderCursor() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  // 📏 Slider-Breite messen
  useEffect(() => {
    if (!sliderRef.current) return;

    const updateWidth = () => {
      setSliderWidth(sliderRef.current!.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 🖱 Cursor folgt Maus
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();

    setCursorX(e.clientX - rect.left);
    setCursorY(e.clientY - rect.top);
  };

  // ◀ / ▶ Erkennung
  const isLeftSide = cursorX < sliderWidth / 2;

  return {
    sliderRef,
    cursorX,
    cursorY,
    isLeftSide,
    handleMouseMove
  };
}
