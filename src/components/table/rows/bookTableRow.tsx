import classNames from "classnames";
import React from "react";

import {
  ReadingStatuses,
  ReadingStatusVariants,
} from "../../../constants/readingStatuses.constants";
import { TBookData } from "../../../types/bookData.types";
import { IconVariants } from "../../../types/icon.types";
import RegularButton, {
  RegularButtonVariants,
} from "../../buttons/regularButton";
import RegularDropdown from "../../dropDowns/regularDropdown";
import BookIcon from "../../icons/book.icon";
import CloseIcon from "../../icons/close.icon";

export default function BookTableRow({
  bookData,
  handleSelectStatus,
  handleDelete,
  isOwner = true,
}: {
  bookData: TBookData;
  handleSelectStatus: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selected: string
  ) => void;
  handleDelete: () => void;
  isOwner?: boolean;
}) {
  const bookStatusStyle = classNames({
    "text-primary": ReadingStatusVariants.Finished === bookData.bookStatus,
    "text-gray-500": ReadingStatusVariants.WantRead === bookData.bookStatus,
    "text-purple-500": ReadingStatusVariants.Reading === bookData.bookStatus,
  });

  return (
    <tr key={bookData.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center text-sm font-medium text-gray-900">
          <BookIcon iconVariant={IconVariants.GRAY} size={10} />
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-center text-gray-900">
          {bookData.bookHeader}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-center text-gray-500">
          {bookData.bookAuthor}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-center text-gray-900">
          {isOwner ? (
            <RegularDropdown
              dropDownList={ReadingStatuses}
              handleSelect={handleSelectStatus}
              defaultValue={bookData.bookStatus}
            />
          ) : (
            <span className={bookStatusStyle}>{bookData.bookStatus}</span>
          )}
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        <div className="text-sm text-center text-gray-500">
          {bookData.bookPdfUrl ? (
            <a
              className="underline"
              target="_blank"
              href={bookData.bookPdfUrl}
              rel="noreferrer"
            >
              Go to Resource
            </a>
          ) : (
            "Empty"
          )}
        </div>
      </td>
      {isOwner ? (
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <div className="text-center">
            <RegularButton
              variant={RegularButtonVariants.DANGER}
              Icon={<CloseIcon />}
              handleClick={handleDelete}
            />
          </div>
        </td>
      ) : null}
    </tr>
  );
}
