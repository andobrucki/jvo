import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Root";
import Biography from "./pages/Biography";
// import { Slideshow } from "./pages/Slideshow";

/* Wrapper-Komponente, die useLocation nutzt
Erklärung:
useLocation() kann nur innerhalb eines Routers verwendet werden → daher AppContent.

App selbst ist jetzt nur der Wrapper (BrowserRouter).

Dein Effekt setzt den Body-Hintergrund nur auf /research-development → alles andere bleibt normal.*/

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/research-development") {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bio" element={<Biography />} />
      {/* <Route
        path="/research-development"
        element={<Slideshow totalImages={107} intervalMs={1000} />}
      /> */}
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
