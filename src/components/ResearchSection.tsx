import { ResearchDiashow } from "./ResearchDiashow";

interface ResearchSectionProps {
  setResearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResearchSection({ setResearch }: ResearchSectionProps) {
  return (
    <>
      {" "}
      <div>
        <button className="back" onClick={() => setResearch(false)}>BACK</button>
        <ResearchDiashow totalImages={10} />
      </div>
    </>
  );
}
