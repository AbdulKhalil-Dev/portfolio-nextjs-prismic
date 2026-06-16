import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { div } from "three/examples/jsm/nodes/Nodes.js";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex: FC<ContentIndexProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for content_index (variation: {slice.variation})
      slices.
      <br />
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
    </Bounded>
  );
};

export default ContentIndex;
