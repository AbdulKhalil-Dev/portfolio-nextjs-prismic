import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[1fr,2fr] items-start">
        <div className="md:row-start-1 w-full mx-auto md:max-w-sm rounded-lg shadow-xl shadow-slate-700/50 overflow-hidden bg-slate-900">
        <PrismicNextImage
          field={slice.primary.avatar}
          className="w-full h-auto object-cover"
        />
        </div>
        <div className="md:col-start-2 grid gap-6">
          <Heading as="h1" size="xl">
            {slice.primary.heading}
          </Heading>
          <div className="prose md:prose-xl prose-slate prose-invert">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <Button
          linkField={slice.primary.button_link}
          label={slice.primary.button_text}
        />
        </div>
      </div>
    </Bounded>
  );
};

export default Biography;
