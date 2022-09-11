import { getStyleByVariant } from "../../helpers/getStyleByVariant";
import { IconVariants, IIconProps } from "../../types/icon.types";

export default function PlusIcon({
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
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}
