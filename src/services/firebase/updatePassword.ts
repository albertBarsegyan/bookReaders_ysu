import { updatePassword, User } from "firebase/auth";

import { RegularPopupVariants } from "../../types/componentVariants.types";

export default function updateUserPassword({
  password,
  user,
}: {
  password: string;
  user: User;
}) {
  return updatePassword(user, password)
    .then(() => {
      return {
        popupVariant: RegularPopupVariants.SUCCESS,
        text: "Your name changed successfully",
      };
    })
    .catch((e) => {
      console.log("e", e);

      return {
        popupVariant: RegularPopupVariants.DANGER,
        text: "Something went wrong",
      };
    });
}
