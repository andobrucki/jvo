import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface OverlayContextType {
  active: boolean;
  goToRoute: (path: string, SlideshowComponent?: ReactNode) => void;
  overlayContent: ReactNode | null;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({ children }) => {
  const [active, setActive] = useState(false);
  const [overlayContent, setOverlayContent] = useState<ReactNode | null>(null);
  const navigate = useNavigate();

  const goToRoute = (path: string, SlideshowComponent?: ReactNode) => {
    if (SlideshowComponent) {
      setOverlayContent(SlideshowComponent); // Slideshow direkt im Overlay
    }
    setActive(true);

    setTimeout(() => {
      navigate(path); // Route wechseln
      setActive(false);
      setOverlayContent(null); // Overlay-Inhalt zurücksetzen
    }, 800); // Dauer der Animation
  };

  return (
    <OverlayContext.Provider value={{ active, goToRoute, overlayContent }}>
      {children}
    </OverlayContext.Provider>
  );
};

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext);
  if (!context) throw new Error("useOverlay must be used within an OverlayProvider");
  return context;
};
