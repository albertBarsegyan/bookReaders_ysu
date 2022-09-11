import { useState } from "react";

import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { StorageConstants } from "../../constants/storage.constants";
import { useFireStoreSnapshot } from "../../hooks/useFireStoreSnapshot.hooks";
import useStorage from "../../hooks/useStorage.hooks";
import RegularButton from "../buttons/regularButton";
import BookList from "../lists/bookList";

export default function BookListContainer() {
  const [showBookList, setShowBookList] = useState<boolean>(false);
  const { getDataFromStorage } = useStorage(localStorage);

  const userUid = getDataFromStorage(StorageConstants.user);

  const [userData] = useFireStoreSnapshot({
    collectionName: FirebaseCollectionNames.Readers,
    documentName: userUid,
  });
  const buttonText = showBookList ? "Hide books" : "Show books";

  const handleBookList = () => {
    setShowBookList((prev) => !prev);
  };

  return (
    <div className="w-full pb-10">
      <div className="flex flex-col items-center justify-between px-20 mx-auto">
        <div>
          <RegularButton handleClick={handleBookList}>
            {buttonText}
          </RegularButton>
        </div>
        <BookList show={showBookList} bookList={userData?.bookList ?? []} />
      </div>
    </div>
  );
}
