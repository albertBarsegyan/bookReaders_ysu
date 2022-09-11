import { getReadPercent } from "../../helpers/getReadPercent";

interface IProgressBarProps {
  booksCount: number;
  readBooksCount: number;
}

export default function ProgressBar({
  booksCount = 1,
  readBooksCount = 0,
}: IProgressBarProps) {
  const readBooksPercent = getReadPercent(readBooksCount, booksCount);

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="w-1/2">
        <div className="flex justify-center w-full gap-2 mb-2">
          <span className="text-2xl text-purple-400">{readBooksPercent}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-sm">
          <div
            className="h-3 rounded-sm bg-lightest"
            style={{ width: `${readBooksPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
