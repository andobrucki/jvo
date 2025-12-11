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

  console.log(projects);

  return (
    <section className="about-page">
      {/* Intro Text */}
      <div
        className="about-intro"
        dangerouslySetInnerHTML={{ __html: introText }}
      />

      {/* Projektliste */}
      <div className="about-projects">
        <ul>
          {projects.map((proj, idx) => (
            <li key={idx}>
              {/* 👇 Link setzt nur den Hash */}
              <a href={`#project-${proj.slug}`}>{proj.title}</a>:{" "}
              {proj.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Optionaler Link zurück zur Startseite */}
      <div className="about-back">
        <Link to="/">Zurück zur Startseite</Link>
      </div>
    </section>
  );
}
