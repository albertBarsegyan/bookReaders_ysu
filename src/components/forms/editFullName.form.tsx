import { User } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";

import { usePopup } from "../../hooks/usePopup.hooks";
import { namesSchema } from "../../schemas/names.schema";
import { updateProfileName } from "../../services/firebase/updateProfileData";
import RegularButton from "../buttons/regularButton";
import CustomInput, { RegularInputVariants } from "../inputs/customInput";

export default function EditFullNameForm({ user }: { user: User }) {
  const { providePopupSettings } = usePopup();

  const [firstName, lastName] = user.displayName
    ? user?.displayName?.split(" ")
    : [];

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
    },

    onSubmit: ({ firstName, lastName }) => {
      updateProfileName(firstName, lastName).then((res) => {
        providePopupSettings(res);
      });
    },
    validationSchema: namesSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          labelText="First name"
          type="text"
          name="firstName"
          variant={RegularInputVariants.FormikInput}
          placeholder="Enter your first name"
        />

        <CustomInput
          labelText="Last name"
          type="text"
          name="lastName"
          variant={RegularInputVariants.FormikInput}
          placeholder="Enter your Last name"
        />

        <div className="mt-10">
          <RegularButton type="submit">Update</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}
