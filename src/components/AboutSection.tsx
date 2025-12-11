import { Link } from "react-router-dom";
import { useEffect } from "react";

type Project = {
  title: string;
  description: string;
  slug: string;
};

type AboutProps = {
  introText: string;
  projects: Project[];
};

export default function About({ introText, projects }: AboutProps) {
  // 👇 Scrollt beim Laden zu #slug
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const scrollToProject = (slug: string) => {
    const id = slug;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  console.log(projects);

  return (
    <section className="about-page">
      {/* Linke Spalte: Projektliste / Inhaltsverzeichnis */}
      <div className="about-projects">
        <ul>
          {projects.map((proj, idx) => (
            <li key={idx}>
              {/* 👇 Link setzt nur den Hash */}
              <a
                href={`#${proj.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToProject(proj.slug);
                }}
              >
                {proj.title}
              </a>
              <br />
              <p>{proj.description}</p>
            </li>
          ))}
          <li>
            <Link to="/bio">
              <p>Vita und Ausstellungsliste</p>
            </Link>
          </li>
          <li>
            Titelbild: The world is narrow and the mind is wide, AdbK München,
            2014
          </li>
        </ul>
      </div>

      {/* Rechte Spalte: Intro Text */}
      <div
        className="about-intro"
        dangerouslySetInnerHTML={{ __html: introText }}
      />

      {/* Optionaler Link zurück zur Startseite */}
      {/* <div className="about-back">
        <Link to="/">Zurück zur Startseite</Link>
      </div> */}
    </section>
  );
}
