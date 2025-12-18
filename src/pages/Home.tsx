import content from "../data/content.json";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";
import ProjectIntro from "../components/ProjectIntro";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <HomeSection title={content.home.title} image={content.home.image} />
      <AboutSection
        introText={content.about.introText}
        projects={content.about.projects}
      />
      {content.projects.map((proj) => (
        <ProjectIntro key={proj.id} project={proj} />
      ))}
    </>
  );
}
