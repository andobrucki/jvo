import React from "react";

// =====================
// Types
// =====================

type Year = number | string;

interface Artist {
  name: string;
  based_in: string;
}

interface EducationItem {
  from: number;
  to?: number;
  institution: string;
}

interface SimpleRangeItem {
  from: number;
  to?: number;
  institution: string;
}

interface Award {
  year: Year;
  title: string;
}

interface CollectionBlock {
  titel: string;
  Sammlungen: string[];
}

interface Contact {
  name: string;
  address_line_1: string;
  address_line_2?: string;
  email: string;
  website: string;
}

interface Exhibition {
  year: number;
  title: string[];
}

export interface BioData {
  artist: Artist;
  education: EducationItem[];
  curating: SimpleRangeItem[];
  awards_and_grants: Award[];
  collections: CollectionBlock[];
  contact: Contact;
  exhibitions_and_projects: Exhibition[];
}

// =====================
// Helper components
// =====================

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="bio-section">
    <h2 className="bio-section-title">{title}</h2>
    <div className="bio-section-content">{children}</div>
  </section>
);

const YearRange: React.FC<{ from: number; to?: number }> = ({ from, to }) => (
  <span className="bio-year">{to ? `${from}–${to}` : from}</span>
);

// =====================
// Main component
// =====================

interface BioProps {
  data: BioData;
}

const Bio: React.FC<BioProps> = ({ data }) => {
  const {
    artist,
    education,
    curating,
    awards_and_grants,
    collections,
    contact,
    exhibitions_and_projects,
  } = data;

  return (
    <article className="bio">
      <div className="bio-layout">
        {/* LEFT COLUMN */}
        <div className="bio-column bio-column--left">
          <Section title="Jonas von Ostrowski">
            <p>{artist.based_in}</p>
            {education.map((item, index) => (
              <div key={index} className="bio-row">
                <YearRange from={item.from} to={item.to} />
                <span>{item.institution}</span>
              </div>
            ))}
          </Section>
          {/* Education */}
          <Section title="Ausbildung">
            <div>{artist.name}</div>
            {education.map((item, index) => (
              <div key={index} className="bio-row">
                <YearRange from={item.from} to={item.to} />
                <span>{item.institution}</span>
              </div>
            ))}
          </Section>

          {/* Curating */}
          <Section title="Projekte / Kuration">
            {curating.map((item, index) => (
              <div key={index} className="bio-row">
                <YearRange from={item.from} to={item.to} />
                <span>{item.institution}</span>
              </div>
            ))}
          </Section>

          {/* Awards */}
          <Section title="Preise & Stipendien">
            {awards_and_grants.map((award, index) => (
              <div key={index} className="bio-row">
                <span className="bio-year">{award.year}</span>
                <span>{award.title}</span>
              </div>
            ))}
          </Section>

          {/* Collections */}
          {collections.map((block, index) => (
            <Section key={index} title={block.titel}>
              <ul className="bio-list">
                {block.Sammlungen.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Section>
          ))}

          {/* Contact */}
          <Section title="Kontakt">
            <address className="bio-address">
              <div>{contact.name}</div>
              <div>{contact.address_line_1}</div>
              {contact.address_line_2 && <div>{contact.address_line_2}</div>}
              <div>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div>
                <a href={contact.website} target="_blank" rel="noreferrer">
                  {contact.website}
                </a>
              </div>
            </address>
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bio-column bio-column--right">
          {/* Exhibitions */}
          <Section title="Ausstellungen & Projekte (Auswahl)">
            {exhibitions_and_projects
              .slice()
              .sort((a, b) => b.year - a.year)
              .map((item) => (
                <div key={item.year} className="bio-year-group">
                  <span className="bio-year">{item.year}</span>
                  <ul className="bio-list">
                    {item.title.map((title, i) => (
                      <li key={i}>{title}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </Section>
        </div>
      </div>
    </article>
  );
};

export default Bio;
