import bioData from "../data/content.json";
import Bio from "../components/BioComponent";

export default function Biography() {
  return <Bio data={bioData.bio} />;
}
