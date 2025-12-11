// src/components/ProjectSection.tsx

type TextBlock = {
  id: string;
  content: string;
};

type Image = {
  src: string;
  alt: string;
};

type Media = {
  type: string;
  src: string;
  poster?: string;
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
    gallery?: Image[];
    media?: Media[];
  };
};

type ProjectSectionProps = {
  project: Project;
};

export default function ProjectSection({ project }: ProjectSectionProps) {
  if (!project) {
    return null;
  }

  console.log(project);

  return (
    <section
      id={`project-${project.slug}`}
      className={`project-section layout-${project.layout}`}
    >
      <header className="project-header">
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p className="project-year">{project.year}</p>
      </header>
      {/* Hauptbild */}
      {project.images?.main && (
        <img
          src={project.images.main.src}
          alt={project.images.main.alt}
          className="project-main-image"
          loading="lazy"
        />
      )}
      {/* Textblöcke */}
      {project.textBlocks.map((block) => (
        <div
          key={block.id}
          className="project-text-block"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      ))}
      {/* Sekundärbild */}
      {project.images?.secondary && (
        <img
          src={project.images.secondary.src}
          alt={project.images.secondary.alt}
          className="project-secondary-image"
          loading="lazy"
        />
      )}
      {/* Galerie */}
      {project.images?.gallery && (
        <div className="project-gallery">
          {project.images.gallery.map((img, idx) => (
            <img key={idx} src={img.src} alt={img.alt} loading="lazy" />
          ))}
        </div>
      )}
      //! hier war eine FEhlermeldung: es wurde anscheinend in Zeile 109 ein
      empty string gepasst
      {/* Media */}
      {/* {project.images?.media && (
        <div className="project-media">
          {project.images.media.map((m, idx) =>
            m.type === "video" ? (
              <video
                key={idx}
                src={m.src}
                poster={m.poster}
                controls
                preload="none"
              />
            ) : (
              <img key={idx} src={m.src} alt={m.poster || "Media"} />
            )
          )}
        </div>
      )} */}
    </section>
  );
}
