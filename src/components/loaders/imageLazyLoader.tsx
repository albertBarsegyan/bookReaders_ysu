import "react-lazy-load-image-component/src/effects/blur.css";

import { LazyLoadImage } from "react-lazy-load-image-component";

import placeHolderImage from "../../assets/img/profilePicture.jpg";

interface IImage {
  alt: string;
  src: any;
  width?: number;
  height?: number;
}

interface IImageLazyLoaderProps {
  image: IImage;
  style?: React.CSSProperties | undefined;
}

export default function ImageLazyLoader({
  image,
  style,
}: IImageLazyLoaderProps) {
  return (
    <LazyLoadImage
      wrapperProps={{ style: { display: "block" } }}
      style={{ ...style, objectFit: "contain" }}
      alt={image.alt}
      placeholderSrc={placeHolderImage}
      effect="blur"
      width={image.width}
      height={image.height}
      src={image.src}
    />
  );
}
