import { useState, useEffect } from "react";

import Navigation from "./Navigation";
export default function Header() {
  const [isCompressed, setIsCompressed] = useState(false);

  useEffect(() => {
    const section = document.querySelector("#about");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Sobald About sichtbar wird → compressed
          setIsCompressed(entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // Fein justierbar
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header">
      <div className="title-wrapper">
        {/* voller Titel */}
        <h1 className={`title-full ${isCompressed ? "hidden-title" : ""}`}>
          <span className="j">J</span>
          <span className="onas">onas</span>
          <span className="space"> </span>
          <span className="v">v</span>
          <span className="on">on</span>
          <span className="space"> </span>
          <span className="o">O</span>
          <span className="strowski">strowski</span>
        </h1>

        {/* komprimierter Titel */}
        <h1 className={`title-short ${isCompressed ? "visible-title" : ""}`}>
          <span className="j">J</span>
          <span className="v">V</span>
          <span className="o">O</span>
        </h1>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
}
