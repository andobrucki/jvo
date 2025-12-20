import { Link } from "react-router-dom"; // import Link from "react-router-dom";

interface NavigationProps {
  setResearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({ setResearch }: NavigationProps) {
  return (
    <nav className="navigation-main">
      <ul className="navigation-list">
        {/* 1. Externer Link */}
        <li className="la">
          <a
            href="https://los-angeles.de.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="icons/losangeles.png" alt="Los Angeles" />
          </a>
        </li>

        {/* 2. Interner Link zur Ausstellungsliste */}
        <li className="info">
          <Link to="/bio">
            {" "}
            <img src="icons/info.png" alt="" />
          </Link>
        </li>

        {/* 3. E-Mail */}
        <li className="contact">
          <a href="mailto:annadobrucki@gmail.com">
            <img src="icons/contact.png" alt="" />
          </a>
        </li>
      </ul>{" "}
      {/* 4. Interner Link zum Raum mit Slideshow */}
      <ul>
        {" "}
        <li className="research-development">
          <button onClick={() => setResearch(true)}>
            research + development
          </button>
        </li>
      </ul>
    </nav>
  );
}
