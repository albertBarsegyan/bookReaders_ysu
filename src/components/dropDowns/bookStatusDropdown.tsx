import React from "react";

import { ReadingStatuses } from "../../constants/readingStatuses.constants";
import RegularDropdown from "./regularDropdown";

interface IBookStatusDropdownProps {
  defaultValue?: string;
  selectStatus: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selected: string
  ) => void;
}

export default function BookStatusDropdown({
  selectStatus,
  defaultValue,
}: IBookStatusDropdownProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <span className="text-white">Select book status</span>
      </div>

      <RegularDropdown
        defaultValue={defaultValue}
        dropDownList={ReadingStatuses}
        handleSelect={selectStatus}
      />
    </div>
  );
}
