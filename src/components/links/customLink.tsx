import classNames from "classnames";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface ICustomLink {
  path: string;
  text: string;
  Icon?: ReactElement;
  customStyle?: string;
  onClick?: (event: any) => void;
}

export default function CustomLink({
  path,
  customStyle,
  text,
  Icon,
  onClick,
}: ICustomLink) {
  const linkStyle = classNames({
    "flex flex-row justify-center items-center gap-x-1 py-2 px-4 text-sm text-primary hover:text-green-900 flex flex-row":
      !customStyle,
    customStyle: !!customStyle,
  });

  return (
    <Link to={path} className={linkStyle} onClick={onClick}>
      {Icon ? (
        <>
          <span>{Icon}</span>
          <span> {text}</span>
        </>
      ) : (
        text
      )}
    </Link>
  );
}
