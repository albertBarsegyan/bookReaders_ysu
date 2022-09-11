import { doc, setDoc } from "firebase/firestore";

import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { db } from "../../libs/firebase/firebaseConfig";
import { RegularPopupVariants } from "../../types/componentVariants.types";

export const addDocumentToCollection = (
  collectionName: FirebaseCollectionNames,
  docName: string,
  dataToAdd: object
) => {
  return setDoc(doc(db, collectionName, docName), dataToAdd)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { popupVariant: RegularPopupVariants.DANGER, text: err.message };
    });
};
