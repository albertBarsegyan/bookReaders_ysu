import { getStyleByVariant } from "../../helpers/getStyleByVariant";
import { useModal } from "../../hooks/useModal.hooks";
import { TBookData } from "../../types/bookData.types";
import { RegularModalVariants } from "../../types/componentVariants.types";
import { IconVariants } from "../../types/icon.types";
import RegularButton, { RegularButtonVariants } from "../buttons/regularButton";
import AddBookForm from "../forms/addBook.form";
import PlusIcon from "../icons/plus.icon";
import BooksTable from "../table/bookTable";

interface IBookListProps {
  show: boolean;
  bookList: TBookData[];
}

export default function BookList({ show, bookList }: IBookListProps) {
  const { provideModalSettings } = useModal();
  const addBook = () => {
    provideModalSettings({
      modalVariant: RegularModalVariants.FORM,
      timeOutToHide: 0,
      FormContainer: AddBookForm,
    });
  };

  if (show) {
    if (!bookList.length) {
      return (
        <div className="flex flex-col items-center justify-center w-full pb-4 mt-4">
          <div className="my-4">
            <span className="text-xl text-purple-400">Book list is empty</span>
          </div>
          <div>
            <RegularButton
              variant={RegularButtonVariants.PRIMARY}
              Icon={
                <PlusIcon iconColor={getStyleByVariant(IconVariants.PRIMARY)} />
              }
              handleClick={addBook}
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <BooksTable bookList={bookList} />
        </div>
        <div className="flex justify-center my-2">
          <RegularButton
            variant={RegularButtonVariants.PRIMARY}
            Icon={<PlusIcon />}
            handleClick={addBook}
          />
        </div>
      </div>
    );
  }

  return null;
}
