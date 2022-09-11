import React, { useState } from "react";

type TDropDownItem = {
  title: string;
  id: string | number;
};

interface IRegularDropdownProps {
  defaultValue?: string;
  dropDownList: TDropDownItem[];
  handleSelect: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selected: string
  ) => void;
}

export default function RegularDropdown({
  defaultValue,
  dropDownList,
  handleSelect,
}: IRegularDropdownProps) {
  const firstItemTitle = dropDownList[0].title;
  const [selected, setSelected] = useState(defaultValue ?? firstItemTitle);
  const [isVisible, setIsVisible] = useState(false);

  const handleClickGenerator = (dropDownItem: TDropDownItem) => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSelected(dropDownItem.title);
      handleSelect(e, dropDownItem.title);
      setIsVisible(false);
    };
  };
  const toggleList = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleList}
        className="text-white rounded-md bg-primary hover:bg-darkest focus:bg-gray-500 font-medium text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selected}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isVisible ? (
        <div className="absolute z-20 w-full text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700">
          <ul className="py-1" aria-labelledby="dropdownButton">
            {dropDownList?.map((dropDownItem) => {
              return (
                <li key={dropDownItem.id} className="w-full">
                  <button
                    onClick={handleClickGenerator(dropDownItem)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    {dropDownItem.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
