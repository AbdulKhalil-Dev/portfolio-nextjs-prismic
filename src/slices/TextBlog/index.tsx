import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TextBlog`.
 */
export type TextBlogProps = SliceComponentProps<Content.TextBlogSlice>;

/**
 * Component for "TextBlog" Slices.
 */
const TextBlog: FC<TextBlogProps> = ({ slice }) => {
  return (
    <div className="max-w-prose">
    <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlog;
