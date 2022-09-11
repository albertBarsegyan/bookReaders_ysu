import * as Yup from "yup";

export const namesSchema = Yup.object().shape({
  firstName: Yup.string().required("First name required."),
  lastName: Yup.string().required("Last name required."),
});
