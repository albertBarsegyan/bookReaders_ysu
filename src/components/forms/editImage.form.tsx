import { FormikProvider, useFormik } from "formik";

import { usePopup } from "../../hooks/usePopup.hooks";
import { updateImage } from "../../services/firebase/updateImage";
import RegularButton from "../buttons/regularButton";
import ImageInput from "../inputs/imageInput";

export default function EditImageForm() {
  const { providePopupSettings } = usePopup();

  const formik = useFormik({
    initialValues: {
      profilePicture: null,
    },
    onSubmit: ({ profilePicture }) => {
      updateImage(profilePicture).then((res) => {
        providePopupSettings(res);
      });
    },
  });

  const handleImage = (e: any) => {
    const inputFile = e.target.files[0];
    formik.setFieldValue("profilePicture", inputFile);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <ImageInput
          labelText="Upload image"
          name="profilePicture"
          onChange={handleImage}
        />

        <div className="mt-10">
          <RegularButton type="submit">Update</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}
