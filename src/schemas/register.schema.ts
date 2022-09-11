import * as Yup from "yup";

Yup.addMethod(Yup.string, "firebaseUserCheck", function (message) {
  return this.test("firebaseUserCheck", message, function (value) {
    return new Promise((resolve, reject) => {});
  });
});

export const registerSchemaFirst = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .required("Fill password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const registerSchemaSecond = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40),
  profilePicture: Yup.mixed(),
});

export const registerSchemaThird = Yup.object().shape({
  booksCount: Yup.string()
    .required("Provide book count")
    .matches(/\d/, "Fill only numbers"),
});
