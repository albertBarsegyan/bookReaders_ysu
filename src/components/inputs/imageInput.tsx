import { Field } from "formik";
import { useState } from "react";

import { usePopup } from "../../hooks/usePopup.hooks";
import { RegularPopupVariants } from "../../types/componentVariants.types";
import RegularButton, { RegularButtonVariants } from "../buttons/regularButton";

export enum ImageInputVariants {
  REGULAR = "regular",
  FORMIK = "formik",
}
interface IFileInputProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  labelText?: string;
  variant?: ImageInputVariants;
}

interface IFieldArgs {
  field: object;
  meta: { error: string; touched: boolean };
}

export default function ImageInput({
  name,
  onChange,
  placeholder,
  labelText,
  variant = ImageInputVariants.REGULAR,
}: IFileInputProps) {
  const [imageUrl, setImageUrl] = useState("");
  const { providePopupSettings } = usePopup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e?.target?.files?.[0];
    const kbToMb = 1_048_576;

    if (uploadedFile) {
      const fileSizeInMb = Number((uploadedFile?.size / kbToMb).toFixed(2));

      if (fileSizeInMb > 1) {
        providePopupSettings({
          popupVariant: RegularPopupVariants.DANGER,
          text: "Image must be lass than 1mb",
        });
        return;
      }

      setImageUrl(URL.createObjectURL(uploadedFile));
      onChange(e);
    }
  };

  const removeImage = () => {
    setImageUrl("");
  };

  const renderVariants = () => {
    switch (variant) {
      case ImageInputVariants.REGULAR:
        return (
          <input
            type="file"
            accept="image/*"
            name={name}
            onChange={handleChange}
            id={name}
            className="opacity-0"
          />
        );
      case ImageInputVariants.FORMIK:
        return (
          <Field name={name}>
            {({ field, meta }: IFieldArgs) => (
              <>
                <div>
                  <input
                    {...field}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="opacity-0"
                  />
                </div>
                <div className="py-2 text-center">
                  <span className="text-sm text-red-400">
                    {meta?.touched && meta?.error}
                  </span>
                </div>
              </>
            )}
          </Field>
        );
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <div className="m-4">
          {labelText ? (
            <label className="inline-block mb-2 text-blue-200">
              {labelText}
            </label>
          ) : null}
          <div className="flex items-center justify-center w-full">
            {imageUrl ? (
              <div>
                <div>
                  <img src={imageUrl} alt="uploaded" />
                </div>
                <div className="flex justify-center mt-4">
                  <RegularButton
                    variant={RegularButtonVariants.DANGER}
                    handleClick={removeImage}
                  >
                    Remove image
                  </RegularButton>
                </div>
              </div>
            ) : (
              <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    {placeholder}
                  </p>
                </div>
                {renderVariants()}
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
