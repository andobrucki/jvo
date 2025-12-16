import "../assets/scss/3-layout/_overlay.scss";
import { useOverlay } from "../context/OverlayContext";

export const Overlay: React.FC = () => {
  const { active, overlayContent } = useOverlay();

  return (
    <div className={`overlay ${active ? "active" : ""}`}>{overlayContent}</div>
  );
};
