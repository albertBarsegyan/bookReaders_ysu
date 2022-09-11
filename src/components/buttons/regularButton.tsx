import classNames from "classnames";
import { ReactElement } from "react";

export enum RegularButtonVariants {
  PRIMARY = "primary",
  DANGER = "danger",
}

interface IRegularButtonProps {
  type?: "button" | "submit" | "reset";
  children?: JSX.Element | JSX.Element[] | string;
  Icon?: ReactElement;
  variant?: RegularButtonVariants;
  handleClick?: () => void;
}

export default function RegularButton({
  type = "button",
  children,
  variant = RegularButtonVariants.PRIMARY,
  Icon,
  handleClick,
}: IRegularButtonProps) {
  const buttonStyles = classNames({
    "h-10 px-5 m-2 text-secondary transition-colors duration-150 rounded-lg focus:shadow-outline":
      true,
    "bg-primary hover:bg-green-800": variant === RegularButtonVariants.PRIMARY,
    "bg-red-400 hover:bg-red-600": variant === RegularButtonVariants.DANGER,
  });

  const renderButtons = () => {
    switch (variant) {
      case RegularButtonVariants.PRIMARY:
      case RegularButtonVariants.DANGER:
        return (
          <button onClick={handleClick} type={type} className={buttonStyles}>
            {Icon ?? null}
            {children}
          </button>
        );
    }
  };

  return <>{renderButtons()}</>;
}
