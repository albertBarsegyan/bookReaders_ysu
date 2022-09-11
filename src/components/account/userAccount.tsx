import profileBg from "../../assets/img/profilePicture.jpg";
import { countReadBook } from "../../helpers/countReadBooks";
import { getReadPercent } from "../../helpers/getReadPercent";
import { IReadingData, IUserInfo } from "../../types/user.types";
import ImageLazyLoader from "../loaders/imageLazyLoader";

export default function UserAccount({
  userProfileData,
  readingData,
}: {
  userProfileData: IUserInfo | null;
  readingData: IReadingData;
}) {
  const readBooksCount = countReadBook(readingData.bookList);

  const readBooksPercent = getReadPercent(
    readBooksCount,
    Number(readingData.booksCount)
  );

  return (
    <div className="flex items-start justify-center py-20 mx-auto">
      <div className="w-1/2 p-3 bg-white shadow rounded-xl">
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-1/2 px-4 py-6 overflow-hidden rounded-md shadow ">
            <ImageLazyLoader
              image={{
                src: userProfileData?.profilePicture ?? profileBg,
                alt: "Profile",
              }}
            />
          </div>

          <div className="w-1/2 ml-2">
            <div className="p-3 my-4 overflow-hidden rounded-md shadow">
              <h3 className="text-2xl text-primary">{userProfileData?.name}</h3>
              <span className="text-primary text-ellipsis">
                {userProfileData?.email}
              </span>
            </div>
            <div className="flex items-center justify-around p-3 rounded-lg shadow">
              <div className="mr-3">
                <span className="block text-center text-purple-300">
                  Must read
                </span>
                <span className="text-xl font-bold text-center text-purple-600">
                  {readingData.booksCount}
                </span>
              </div>
              <div>
                <span className="block text-purple-300">Progress</span>
                <span className="text-xl font-bold text-purple-600">
                  {readBooksPercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
