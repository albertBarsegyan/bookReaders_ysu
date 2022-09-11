import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { upperFirst } from "lodash";

import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { storage } from "../../libs/firebase/firebaseConfig";
import { RegularPopupVariants } from "../../types/componentVariants.types";
import { FirebaseFieldNames } from "./../../constants/firebase.constants";
import { updateDocumentField } from "./updateDocumentField";

export const updateProfileData = async (
  firstName: string,
  lastName: string,
  profilePicture: File | undefined
) => {
  const { currentUser } = getAuth();
  const imageType = profilePicture?.type.split("/")[1];
  let fileRef;

  if (currentUser) {
    try {
      await updateProfile(currentUser, {
        displayName: `${upperFirst(firstName)} ${upperFirst(lastName)}`,
      });

      if (profilePicture) {
        fileRef = ref(storage, `${currentUser?.uid}.${imageType}`);
        await uploadBytes(fileRef, profilePicture);
        const photoURL = await getDownloadURL(fileRef);
        await updateProfile(currentUser, {
          photoURL,
        });
      }

      return {
        popupVariant: RegularPopupVariants.SUCCESS,
        text: "Profile settings added successfully",
      };
    } catch (err) {
      return {
        popupVariant: RegularPopupVariants.DANGER,
        text: "Something went wrong.",
      };
    }
  }
};

export const updateProfileName = async (
  firstName: string,
  lastName: string
) => {
  const { currentUser } = getAuth();
  const errorMessage = {
    popupVariant: RegularPopupVariants.DANGER,
    text: "Something went wrong.",
  };
  try {
    const fullName = `${upperFirst(firstName)} ${upperFirst(lastName)}`;
    let popupMessage;
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: fullName,
      });

      popupMessage = await updateDocumentField(
        FirebaseCollectionNames.Users,
        currentUser?.uid,
        fullName,
        FirebaseFieldNames.Name
      );
    }

    return popupMessage
      ? {
          popupVariant: RegularPopupVariants.SUCCESS,
          text: "Your name changed successfully",
        }
      : errorMessage;
  } catch (e) {
    return errorMessage;
  }
};
