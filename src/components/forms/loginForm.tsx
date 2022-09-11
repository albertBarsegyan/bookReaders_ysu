import { FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { AppRoutes } from "../../constants/route.constants";
import { useAuth } from "../../hooks/useAuth.hooks";
import { IPopupState, usePopup } from "../../hooks/usePopup.hooks";
import { loginSchema } from "../../schemas/login.schema";
import { RegularPopupVariants } from "../../types/componentVariants.types";
import RegularButton from "../buttons/regularButton";
import CustomInput, { RegularInputVariants } from "../inputs/customInput";

export default function LoginForm() {
  const { signIn, makeAccessToAuthApp } = useAuth();
  const navigate = useNavigate();
  const { providePopupSettings } = usePopup();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      signIn(email, password).then((res) => {
        if (res?.popupVariant === RegularPopupVariants.DANGER) {
          providePopupSettings(res as IPopupState);
          return;
        }
        makeAccessToAuthApp();
        navigate(AppRoutes.authenticatedRoutes.home);
      });
    },
    validationSchema: loginSchema,
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          labelText="Email Address"
          variant={RegularInputVariants.FormikInput}
          placeholder="Type email"
          name="email"
        />
        <div className="mt-8">
          <CustomInput
            labelText="Password"
            type="password"
            name="password"
            variant={RegularInputVariants.FormikInput}
            placeholder="Enter your password"
          />
        </div>
        <div className="mt-10">
          <RegularButton type="submit">Log in</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}
