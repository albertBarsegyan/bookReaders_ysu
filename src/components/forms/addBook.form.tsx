import { FormikProvider, useFormik } from "formik";
import { upperFirst } from "lodash";
import { nanoid } from "nanoid";
import { useRef } from "react";

import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { PopupMessages } from "../../constants/popupMessages.constants";
import { ReadingStatuses } from "../../constants/readingStatuses.constants";
import { useAuth } from "../../hooks/useAuth.hooks";
import useClickOutside from "../../hooks/useClickOutside.hooks";
import { useModal } from "../../hooks/useModal.hooks";
import { usePopup } from "../../hooks/usePopup.hooks";
import { bookAddSchema } from "../../schemas/bookAdd.schema";
import { pushToDocumentField } from "../../services/firebase/updateDocumentField";
import RegularButton from "../buttons/regularButton";
import BookStatusDropdown from "../dropDowns/bookStatusDropdown";
import CustomInput, { RegularInputVariants } from "../inputs/customInput";

const upperNameParts = (fullName: string) => {
  return fullName
    .split(" ")
    .map((namePart) => upperFirst(namePart))
    .join(" ");
};

export default function AddBookForm() {
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const { providePopupSettings } = usePopup();
  const { closeModal } = useModal();

  const formik = useFormik({
    initialValues: {
      bookAuthor: "",
      bookHeader: "",
      bookPdfUrl: "",
      bookStatus: ReadingStatuses[0].title,
    },
    onSubmit: (values) => {
      const bookAuthorUpperFirst = upperNameParts(values.bookAuthor);
      const bookHeaderUpperFirst = upperNameParts(values.bookHeader);
      const dataToAdd = {
        ...values,
        bookAuthor: bookAuthorUpperFirst,
        bookHeader: bookHeaderUpperFirst,
        id: nanoid(),
      };

      if (user) {
        pushToDocumentField({
          collectionName: FirebaseCollectionNames.Readers,
          documentName: user?.uid,
          dataForUpdate: dataToAdd,
          fieldName: "bookList",
          successMessage: PopupMessages.successBookAdd,
        }).then((res) => {
          providePopupSettings(res);
          closeModal();
        });
      }
    },
    validationSchema: bookAddSchema,
  });

  useClickOutside(formRef, closeModal);

  const handleStatus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    selected: string
  ) => {
    e.stopPropagation();
    formik.setFieldValue("bookStatus", selected);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} ref={formRef}>
        <CustomInput
          labelText="Author Name"
          variant={RegularInputVariants.FormikInput}
          placeholder="Who is author"
          name="bookAuthor"
        />
        <div className="mt-4">
          <CustomInput
            labelText="Book Name"
            name="bookHeader"
            variant={RegularInputVariants.FormikInput}
            placeholder="What is book Header"
          />
        </div>
        <div className="mt-4">
          <CustomInput
            labelText="Book pdf url"
            name="bookPdfUrl"
            variant={RegularInputVariants.FormikInput}
            placeholder="Provide book source"
          />
        </div>
        <div>
          <BookStatusDropdown selectStatus={handleStatus} />
        </div>
        <div className="mt-10">
          <RegularButton type="submit">Add book</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}
