import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `ImageBlog`.
 */
export type ImageBlogProps = SliceComponentProps<Content.ImageBlogSlice>;

/**
 * Component for "ImageBlog" Slices.
 */
const ImageBlog: FC<ImageBlogProps> = ({ slice }) => {
  return (
    <PrismicNextImage field={slice.primary.image} imgixParams={{w: 600}} />
  );
};

export default ImageBlog;
