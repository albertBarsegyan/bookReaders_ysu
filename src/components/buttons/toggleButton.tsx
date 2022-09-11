import classNames from "classnames";
import React, { ReactElement, useState } from "react";

export default function ToggleButton({
  text,
  children,
}: {
  text: string;
  children: ReactElement;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle = classNames({
    "w-full py-5 text-center rounded-sm hover:bg-primary hover:text-white":
      true,
    "border border-primary text-primary": !isOpen,
    "bg-primary text-white": isOpen,
  });

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full my-2">
      <button onClick={handleClick} className={buttonStyle}>
        {text}
      </button>
      {isOpen ? <div className="px-5 py-10 shadow">{children}</div> : null}
    </div>
  );
}
