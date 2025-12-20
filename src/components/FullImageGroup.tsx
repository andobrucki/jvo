import { useState } from "react";
import FullImageBlock from "./FullImageBlock";

type Image = {
  src: string;
  alt: string;
};

interface Props {
  images: Image[];
}

export default function FullImageGroup({ images }: Props) {
  const [referenceHeight, setReferenceHeight] = useState<number>();

  return (
    <div className="full-image-block">
      {images.map((img, i) => {
        const isPortrait = false; // gleich automatisch

        return (
          <FullImageBlock
            key={i}
            src={img.src}
            alt={img.alt}
            isPortrait={isPortrait}
            targetHeight={isPortrait ? referenceHeight : undefined}
            onHeightCalculated={(h) => setReferenceHeight(h)}
          />
        );
      })}
    </div>
  );
}
