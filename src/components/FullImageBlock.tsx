import { useEffect, useRef, useState } from "react";

interface FullImageBlockProps {
  src: string;
  alt?: string;
  isPortrait?: boolean;
  targetHeight?: number; // Höhe des Querformats
  onHeightCalculated?: (height: number) => void; // Callback für Parent
}

export default function FullImageBlock({
  src,
  alt,
  targetHeight,
  onHeightCalculated,
}: FullImageBlockProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;

    const portrait = img.naturalHeight > img.naturalWidth;
    setIsPortrait(portrait);

    // 👉 Nur Querformate bestimmen die Referenzhöhe
    if (!portrait) {
      const height = img.clientHeight;
      onHeightCalculated?.(height);
    }
  }, []);

  return (
    <div
      className="full-image-item"
      style={{
        height: isPortrait && targetHeight ? `${targetHeight}px` : "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: isPortrait ? "auto" : "100%",
          height: isPortrait ? "100%" : "auto",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
