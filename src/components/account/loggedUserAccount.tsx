import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { StorageConstants } from "../../constants/storage.constants";
import { countReadBook } from "../../helpers/countReadBooks";
import { useAuth } from "../../hooks/useAuth.hooks";
import { useFireStoreSnapshot } from "../../hooks/useFireStoreSnapshot.hooks";
import useStorage from "../../hooks/useStorage.hooks";
import { IReadingData } from "../../types/user.types";
import GreetingUser from "../greeting/greetingUser";
import SpinnerLoader from "../loaders/spinner.loader";
import Profile from "../profile/profile";
import ProgressBar from "../progressBar/progressBar";
import ReadingInfo from "../readingInfo/readingInfo";

export default function LoggedUserAccount() {
  const { getDataFromStorage: getDataFromLocalStorage } =
    useStorage(localStorage);

  const userFromLocalStorage = getDataFromLocalStorage(StorageConstants.user);
  const { user } = useAuth();

  const [userData] = useFireStoreSnapshot({
    collectionName: FirebaseCollectionNames.Readers,
    documentName: userFromLocalStorage,
  });

  const readBooksCount = countReadBook(userData?.bookList ?? []);

  if (userData)
    return (
      <div className="py-4 mt-4">
        <GreetingUser />
        <Profile user={user} />
        <ReadingInfo userData={userData as IReadingData} />
        <ProgressBar
          booksCount={Number(userData?.booksCount) ?? 0}
          readBooksCount={readBooksCount}
        />
      </div>
    );

  return <SpinnerLoader isFullScreen />;
}
