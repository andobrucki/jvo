
import FullImageGroup from "./FullImageGroup";
import SliderBlock from "./SliderBlock";

type Image = {
  src: string;
  alt: string;
  caption?: string;
};

type ContentBlock = {
  type: "fullImage" | "slider";
  images: Image[];
};

type ContentBlocksProps = {
  blocks: ContentBlock[];
};

// export default function ContentBlocks({ blocks }: ContentBlocksProps) {
//   return (
//     <div className="project-content-blocks">
//       {blocks.map((block, idx) => {
//         switch (block.type) {
//           case "fullImage":
//             // Temporär ein einfaches <img> für TS-Test
//             return (
//               <div key={idx} className="full-image-block">
//                 {block.images.map((img, i) => (
//                   <img key={i} src={img.src} alt={img.alt} />
//                 ))}
//               </div>
//             );
//           case "slider":
//             return <SliderBlock key={idx} images={block.images} />;
//           default:
//             return null;
//         }
//       })}
//     </div>
//   );
// }

export default function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <div className="project-content-blocks">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "fullImage":
            return (
              <FullImageGroup
                key={idx}
                images={block.images}
              />
            );

          case "slider":
            return <SliderBlock key={idx} images={block.images} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
