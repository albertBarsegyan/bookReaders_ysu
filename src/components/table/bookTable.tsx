import {
  FirebaseCollectionNames,
  FirebaseFieldNames,
} from "../../constants/firebase.constants";
import { PopupMessages } from "../../constants/popupMessages.constants";
import { useAuth } from "../../hooks/useAuth.hooks";
import { usePopup } from "../../hooks/usePopup.hooks";
import { updateDocumentField } from "../../services/firebase/updateDocumentField";
import { TBookData } from "../../types/bookData.types";
import BookTableRow from "./rows/bookTableRow";

export default function BooksTable({
  bookList,
  isOwner = true,
}: {
  bookList: TBookData[];
  isOwner?: boolean;
}) {
  const { user } = useAuth();
  const { providePopupSettings } = usePopup();

  const handleDeleteGenerator = (id: number | string) => {
    return () => {
      const filteredData = bookList.filter((bookData) => bookData.id !== id);
      if (user) {
        updateDocumentField(
          FirebaseCollectionNames.Readers,
          user.uid,
          filteredData,
          FirebaseFieldNames.BookList,
          PopupMessages.successDeleteBook
        ).then((res) => {
          providePopupSettings(res);
        });
      }
    };
  };

  const handleSelectGenerator = (id: number | string) => {
    return (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      selected: string
    ) => {
      const updatedData = bookList.map((bookData) => {
        if (bookData.id === id) {
          return { ...bookData, bookStatus: selected };
        }
        return bookData;
      });

      if (user) {
        updateDocumentField(
          FirebaseCollectionNames.Readers,
          user.uid,
          updatedData,
          FirebaseFieldNames.BookList,
          PopupMessages.successReadingStatusChange
        ).then((res) => {
          providePopupSettings(res);
        });
      }
    };
  };

  if (!bookList.length) {
    return (
      <div className="flex justify-center my-5">
        <p className="w-1/6 py-3 text-2xl text-center shadow text-primary">
          Books Empty
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-11/12 mx-auto">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Book Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Book Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Book Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Reading Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Book pdf url
                  </th>
                  {isOwner ? (
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                    >
                      Delete
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookList.map((bookData) => {
                  return (
                    <BookTableRow
                      key={bookData.id}
                      bookData={bookData}
                      handleSelectStatus={handleSelectGenerator(bookData.id)}
                      handleDelete={handleDeleteGenerator(bookData.id)}
                      isOwner={isOwner}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
