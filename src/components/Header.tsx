import { useState, useEffect } from "react";
import Navigation from "./Navigation";

//Header bekommt setResearch als Prop
interface HeaderProps {
  setResearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ setResearch }: HeaderProps ) {
  const [isCompressed, setIsCompressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check, wie weit vom oberen Rand gescrollt wurde
      if (window.scrollY > 50 && !isCompressed) {
        // Sobald wir 50px nach unten scrollen → komprimieren
        setIsCompressed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCompressed]);

  return (
    <header className="header">
      <div className="title-wrapper">
        <h1 className={`title-full ${isCompressed ? "hidden" : ""}`}>
          Jonas von Ostrowski
        </h1>
        <h1 className={`title-short ${isCompressed ? "visible" : ""}`}>
          J V O
        </h1>
      </div>

      <Navigation setResearch={setResearch}/>
    </header>
  );
}
