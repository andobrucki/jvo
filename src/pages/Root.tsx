import { useState } from "react";
import content from "../data/content.json";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ProjectIntro from "../components/ProjectIntro";
import Header from "../components/Header";
import ResearchSection from "../components/ResearchSection";

export default function Root() {
  const [research, setResearch] = useState<boolean>(false);

  return (
    <>
      {!research && <Header setResearch={setResearch} />}

      <div className="viewport">
        <div className={`page-slider ${research ? "move" : ""}`}>
          <div className="page white">
            {/* Weißer Raum */}
            <HomeSection
              title={content.home.title}
              image={content.home.image}
            />
            <AboutSection
              introText={content.about.introText}
              projects={content.about.projects}
            />
            {content.projects.map((proj) => (
              <ProjectIntro key={proj.id} project={proj} />
            ))}
          </div>

          {/* Schwarzer Raum */}
          <div className="page black">
            <ResearchSection setResearch={setResearch} />
          </div>
        </div>
      </div>
    </>
  );
}
