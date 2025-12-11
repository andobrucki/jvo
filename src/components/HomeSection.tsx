import { Link } from "react-router-dom";

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
        <img
          src={image.src}
          alt={image.alt}
          className="home-image"
          loading="lazy"
        />
        <div className="home-text">
          <h1>{title}</h1>
          <Link to="/bio">
            <p>Bio</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
