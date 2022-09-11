import { ReadingStatusVariants } from "../constants/readingStatuses.constants";

export type TBookData = {
  bookAuthor: string;
  bookHeader: string;
  bookPdfUrl: string;
  bookStatus: ReadingStatusVariants;
  id: number | string;
};
