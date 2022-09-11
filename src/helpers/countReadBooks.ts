import { TBookData } from "./../types/bookData.types";

export const countReadBook = (bookList: TBookData[]) => {
  let count = 0;
  bookList.forEach((bookData) => {
    if (bookData.bookStatus === "finished") count += 1;
  });
  return count;
};
