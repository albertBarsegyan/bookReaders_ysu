import React, { useState } from "react";

import CheckIcon from "../icons/check.icon";
import CloseIcon from "../icons/close.icon";

export default function EditInput({
  text,
  onSave,
}: {
  text: string;
  onSave: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    editedValue: string
  ) => void;
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [editedValue, setEditedValue] = useState(text);

  const toggleBetweenEdit = () => setIsEditable((prev) => !prev);

  const handleChange = (e: { target: HTMLInputElement }) => {
    const inputValue = e.target.value;
    setEditedValue((prev) => {
      if (!inputValue) {
        return prev;
      }
      if (Number(inputValue)) {
        return inputValue;
      }
      return prev;
    });
  };

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onSave(e, editedValue);
    setIsEditable(false);
  };

  return (
    <>
      {isEditable ? (
        <div className="inline px-2 w-5 relative">
          <input
            className="bg-transparent w-16 border border-gray-100 px-2 outline-none text-center text-2xl text-purple-400"
            type="text"
            onChange={handleChange}
            value={editedValue}
          />

          <div className="absolute top-8 left-0 flex justify-around w-full">
            <button
              className="bg-primary hover:bg-green-800"
              onClick={handleSave}
            >
              <CheckIcon />
            </button>
            <button
              className="bg-red-400 hover:bg-red-600 rounded-sm"
              onClick={() => setIsEditable(false)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleBetweenEdit}
          className="inline-block bg-transparent px-2 text-2xl text-lightest hover:text-primary hover:text-4xl duration-100"
        >
          {text}
        </button>
      )}
    </>
  );
}
