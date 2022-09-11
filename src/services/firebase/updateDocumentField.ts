import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { db } from "../../libs/firebase/firebaseConfig";
import { RegularPopupVariants } from "../../types/componentVariants.types";

export const updateDocumentField = (
  collectionName: FirebaseCollectionNames,
  documentName: string,
  dataForUpdate: object | string | number,
  fieldName?: string | null,
  successMessage?: string
) => {
  const data = fieldName ? { [fieldName]: dataForUpdate } : dataForUpdate;

  return updateDoc(doc(db, collectionName, documentName), data)
    .then(() => {
      return {
        popupVariant: RegularPopupVariants.SUCCESS,
        text: successMessage ?? "Item added successfully",
      };
    })
    .catch((error) => {
      return {
        popupVariant: RegularPopupVariants.DANGER,
        text: error.message,
      };
    });
};

export const pushToDocumentField = ({
  collectionName,
  documentName,
  dataForUpdate,
  fieldName,
  successMessage,
}: {
  collectionName: FirebaseCollectionNames;
  documentName: string;
  dataForUpdate: any;
  fieldName: string;
  successMessage: string;
}) => {
  return updateDoc(doc(db, collectionName, documentName), {
    [fieldName]: arrayUnion(dataForUpdate),
  })
    .then(() => {
      return {
        popupVariant: RegularPopupVariants.SUCCESS,
        text: successMessage ?? "Item added successfully",
      };
    })
    .catch((error) => {
      return {
        popupVariant: RegularPopupVariants.DANGER,
        text: error.message,
      };
    });
};
