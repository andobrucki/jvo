import ContentBlocks from "./ContentBlocks";

type TextBlock = {
  id: string;
  content: string;
};

type Image = {
  src: string;
  alt: string;
  caption: string;
};

type Project = {
  id: number;
  slug: string;
  layout: string;
  title: string;
  description: string;
  year: number;
  textBlocks: TextBlock[];
  images?: {
    main?: Image;
    secondary?: Image;
  };
};

type ProjectIntroProps = {
  project: Project;
};

export default function ProjectIntro({ project }: ProjectIntroProps) {
  if (!project) return null;

  const { layout, title, textBlocks, images } = project;

  const text1 = textBlocks[0];
  const text2 = textBlocks[1];

  const renderText = (block?: TextBlock) =>
    block ? (
      <div
        className="project-text-block"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    ) : null;

  const renderImage = (img?: Image, className?: string) =>
    img ? (
      <img src={img.src} alt={img.alt} className={className} loading="lazy" />
    ) : null;

  console.log(layout);

  const renderLayout = () => {
    switch (layout) {
      case "a":
        // Links: Titel, Text1 | Rechts: Bild1, Text2
        return (
          <>
            <div className="col-left">
              <h2>{title}</h2>
              {renderText(text1)}
            </div>
            <div className="col-right">
              {renderImage(images?.main, "project-main-image")}
              {renderText(text2)}
            </div>
          </>
        );
      case "b":
        // Links: Titel, Text1 | Rechts: Bild1
        return (
          <>
            <div className="col-left">
              <h2>{title}</h2>
              {renderText(text1)}
            </div>
            <div className="col-right">
              {renderImage(images?.main, "project-main-image")}
            </div>
          </>
        );
      case "c":
        // Links: Bild1 | Rechts: Bild2, Titel, Text1
        return (
          <>
            <div className="col-left">
              {renderImage(images?.main, "project-main-image")}
            </div>
            <div className="col-right">
              {renderImage(images?.secondary, "project-secondary-image")}
              <h2>{title}</h2>
              {renderText(text1)}
            </div>
          </>
        );
      case "d":
        // Links: Titel, Bild1 | Rechts: Bild2, Text1
        return (
          <>
            <div className="col-left">
              <h2>{title}</h2>
              {renderImage(images?.main, "project-main-image")}
            </div>
            <div className="col-right">
              {renderImage(images?.secondary, "project-secondary-image")}
              {renderText(text1)}
            </div>
          </>
        );
      default:
        // Fallback: einfache lineare Darstellung
        return (
          <div className="col-single">
            <h2>{title}</h2>
            {renderImage(images?.main, "project-main-image")}
            {textBlocks.map((block) => (
              <div
                key={block.id}
                className="project-text-block"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            ))}
            {renderImage(images?.secondary, "project-secondary-image")}
          </div>
        );
    }
  };

  return (
    <section id={project.slug} className={`project-section layout-${layout}`}>
      <header className="project-header">
        {/* <div className="project-meta">
          <p className="project-description">{description}</p>
        </div> */}
      </header>
      <div className="project-inner">{renderLayout()}</div>

{project.contentBlocks && (
  <ContentBlocks blocks={project.contentBlocks} />
)}
    </section>
  );
}
