import content from "../data/content.json";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ProjectSection from "../components/ProjectSection";

export default function Home() {
  return (
    <>
      <HomeSection title={content.home.title} image={content.home.image} />
      <AboutSection
        introText={content.about.introText}
        projects={content.about.projects}
      />
      {content.projects.map((proj) => (
        <ProjectSection key={proj.id} project={proj} />
      ))}
    </>
  );
}
