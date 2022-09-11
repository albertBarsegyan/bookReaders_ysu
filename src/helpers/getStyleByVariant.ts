import classNames from "classnames";

import { IconVariants } from "./../types/icon.types";

export const getStyleByVariant = (variant: IconVariants, size: number = 6) => {
  const iconStyles = classNames({
    [`h-6 w-6`]: true,
    "stroke-primary hover:stroke-darkest": variant === IconVariants.PRIMARY,
    "stroke-white": variant === IconVariants.WHITE,
    "stroke-gray-500 hover:stroke-gray-700": variant === IconVariants.GRAY,
    "stroke-red-500 hover:stroke-red-700": variant === IconVariants.DANGER,
  });

  return iconStyles;
};
