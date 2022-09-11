import {
  FirebaseCollectionNames,
  FirebaseFieldNames,
} from "../../constants/firebase.constants";
import { PopupMessages } from "../../constants/popupMessages.constants";
import { StorageConstants } from "../../constants/storage.constants";
import { usePopup } from "../../hooks/usePopup.hooks";
import useStorage from "../../hooks/useStorage.hooks";
import { updateDocumentField } from "../../services/firebase/updateDocumentField";
import { IReadingData } from "../../types/user.types";
import EditInput from "../inputs/editInput";

export default function ReadingInfo({ userData }: { userData: IReadingData }) {
  const currentYear = new Date().getFullYear();
  const { getDataFromStorage } = useStorage();
  const userUid = getDataFromStorage(StorageConstants.user);
  const { providePopupSettings } = usePopup();
  const changeBooksCount = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    booksCount: string
  ) => {
    updateDocumentField(
      FirebaseCollectionNames.Readers,
      userUid,
      booksCount,
      FirebaseFieldNames.BooksCount,
      PopupMessages.successBooksCountChange
    ).then((res) => {
      providePopupSettings(res);
    });
  };

  return (
    <div className="flex justify-center mt-4">
      <div>
        <p className="text-center text-gray-500">
          In
          <span className="mx-2 text-2xl text-lightest">{currentYear}</span>
          you must read
          <EditInput
            onSave={changeBooksCount}
            text={String(userData?.booksCount)}
          />
          book
        </p>
      </div>
    </div>
  );
}
