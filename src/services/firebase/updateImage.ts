import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "../../libs/firebase/firebaseConfig";
import { RegularPopupVariants } from "../../types/componentVariants.types";

export const updateImage = async (profilePicture: File | null) => {
  const { currentUser } = getAuth();
  const imageType = profilePicture?.type.split("/")[1];
  let fileRef;

  if (currentUser && profilePicture) {
    try {
      fileRef = ref(storage, `${currentUser?.uid}.${imageType}`);
      await uploadBytes(fileRef, profilePicture);
      const photoURL = await getDownloadURL(fileRef);
      await updateProfile(currentUser, {
        photoURL,
      });
      return {
        popupVariant: RegularPopupVariants.SUCCESS,
        text: "Profile image changed successfully",
      };
    } catch (err) {
      return {
        popupVariant: RegularPopupVariants.DANGER,
        text: "Something went wrong.",
      };
    }
  }
  return {
    popupVariant: RegularPopupVariants.DANGER,
    text: "Something went wrong.",
  };
};
