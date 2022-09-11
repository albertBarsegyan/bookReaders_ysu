import * as Yup from "yup";

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Fill password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.string()
    .required("Passwords don't match")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
