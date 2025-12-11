
type Image = {
  src: string;
  alt: string;
};

type HomeProps = {
  title: string;
  image: Image;
};

export default function Home({ title, image }: HomeProps) {
  return (
    <section className="home">
      <div className="home-container">
        {/* Linke Spalte: Titel */}
        <div className="home-text">
          <h1>{title}</h1>
        
        </div>
        {/* Rechte Spalte: Bild */}
        <img
          src={image.src}
          alt={image.alt}
          className="home-image"
          loading="lazy"
        />
      </div>
    </section>
  );
}
