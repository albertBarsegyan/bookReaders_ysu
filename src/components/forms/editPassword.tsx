import { User } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";

import { usePopup } from "../../hooks/usePopup.hooks";
import { passwordSchema } from "../../schemas/password.schema";
import updateUserPassword from "../../services/firebase/updatePassword";
import RegularButton from "../buttons/regularButton";
import CustomInput, { RegularInputVariants } from "../inputs/customInput";

export default function EditPassword({ user }: { user: User }) {
  const { providePopupSettings } = usePopup();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ password }) => {
      updateUserPassword({ user, password }).then((res) => {
        providePopupSettings(res);
      });
    },
    validationSchema: passwordSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          labelText="New password"
          type="password"
          name="password"
          variant={RegularInputVariants.FormikInput}
          placeholder="Enter password"
        />

        <CustomInput
          labelText="Repeat password"
          type="password"
          name="confirmPassword"
          variant={RegularInputVariants.FormikInput}
          placeholder="Repeat password"
        />

        <div className="mt-10">
          <RegularButton type="submit">Update</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}
