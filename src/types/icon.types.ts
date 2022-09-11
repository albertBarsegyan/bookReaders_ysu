export enum IconVariants {
  PRIMARY = "primary",
  GRAY = "gray",
  WHITE = "white",
  DANGER = "danger",
}

export interface IIconProps {
  iconColor?: string;
  iconVariant?: IconVariants;
  size?: number;
}
