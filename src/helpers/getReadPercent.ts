export const getReadPercent = (readBooksCount: number, booksCount: number) =>
  ((readBooksCount / booksCount) * 100).toFixed(2);
