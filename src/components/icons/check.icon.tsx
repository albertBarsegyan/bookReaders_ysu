import React from "react";

import { getStyleByVariant } from "../../helpers/getStyleByVariant";
import { IconVariants, IIconProps } from "../../types/icon.types";

export default function CheckIcon({
  iconVariant = IconVariants.WHITE,
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={getStyleByVariant(iconVariant)}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
