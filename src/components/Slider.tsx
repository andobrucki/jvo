import { useState, useEffect, useRef } from "react";
import { MdArrowBackIos, MdArrowForwardIos, MdClose } from "react-icons/md";

interface MediaItem {
  type: string;
  src: string;
  alt?: string;
  caption?: string;
}

interface FullMediaItem {
  src: string;
  caption?: string;
}

interface SliderProps {
  mediaData: MediaItem[];
  fullMediaData: FullMediaItem[];
  activeIndex: number;
  closeSlider: () => void;
}

const Slider: React.FC<SliderProps> = ({
  mediaData,
  fullMediaData,
  activeIndex,
  closeSlider,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(activeIndex);
  const [isLandscape, setIsLandscape] = useState<boolean>(true);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const currentMedia = mediaData[currentIndex];
    if (currentMedia?.type === "image" && currentMedia?.src) {
      const image = new Image();
      image.src = currentMedia.src;
      // When the image is loaded, set the isLandscape state
      // based on whether the image is wider than it is tall.
      image.onload = () => {
        setIsLandscape(image.width > image.height);
      };
    }
  }, [currentIndex, mediaData]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaData.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaData.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX; // End point of the touch
    const diffX = touchStartX.current - touchEndX.current; // Calculate the swipe distance

    if (Math.abs(diffX) > 50) {
      // Swipe threshold to detect swipe action
      if (diffX > 0) {
        // Swipe left (next slide)
        nextSlide();
      } else {
        // Swipe right (previous slide)
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (mediaData.length > 1) {
        if (event.key === "ArrowRight") {
          nextSlide();
        } else if (event.key === "ArrowLeft") {
          prevSlide();
        }
      }
      if (event.key === "Escape") {
        closeSlider();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mediaData.length, closeSlider]);

  if (!mediaData || mediaData.length === 0) {
    // Check if mediaData is undefined or empty
    return <div>Loading...</div>;
  }

  return (
    <div
      className="slider"
      onTouchStart={handleTouchStart} // Listen for touch start
      onTouchEnd={handleTouchEnd} // Listen for touch end
      style={{ touchAction: "none" }} // Disable default scroll behavior
    >
      <button className="slider__close-btn" onClick={closeSlider}>
        <MdClose />
      </button>

      {mediaData.length > 1 && (
        <button className="slider__prev-btn" onClick={prevSlide}>
          <MdArrowBackIos />
        </button>
      )}

      <div className="slider__img-container">
        {mediaData[currentIndex]?.type === "image" &&
          mediaData[currentIndex]?.src && (
            <img
              src={mediaData[currentIndex]?.src}
              alt={mediaData[currentIndex]?.alt || `Slide ${currentIndex + 1}`}
              className={`slider__img ${
                isLandscape ? "landscape" : "portrait"
              }`}
            />
          )}
        {fullMediaData && fullMediaData[currentIndex]?.caption && (
          <div className="slider__caption">
            {fullMediaData[currentIndex].caption}
          </div>
        )}
      </div>

      {mediaData.length > 1 && (
        <button className="slider__next-btn" onClick={nextSlide}>
          <MdArrowForwardIos />
        </button>
      )}
    </div>
  );
};

export default Slider;
