import { Field } from "formik";
import React from "react";

export enum RegularInputVariants {
  Regular = "regular",
  FormikInput = "formikInput",
}

interface ICustomInputProps {
  name: string;
  labelText?: string;
  placeholder: string;
  type?: string;
  variant?: RegularInputVariants;
}

interface IField {
  field: object;
  meta: { error: string; touched: boolean };
}

export default function CustomInput({
  name,
  labelText,
  placeholder,
  type = "text",
  variant = RegularInputVariants.Regular,
}: ICustomInputProps) {
  const inputStyle =
    "w-full text-lg text-gray-700 py-2 px-3 border-b rounded-md border-gray-300 focus:outline-none focus:border-indigo-500";

  const renderContent = React.useCallback(() => {
    switch (variant) {
      case RegularInputVariants.Regular:
        return (
          <div className="my-2">
            {labelText ? (
              <label
                htmlFor={name}
                className="text-sm font-bold text-lightest tracking-wide"
              >
                {labelText}
              </label>
            ) : null}
            <input
              id={name}
              name={name}
              className={inputStyle}
              type={type}
              placeholder={placeholder}
            />
          </div>
        );

      case RegularInputVariants.FormikInput:
        return (
          <Field name={name} type={type}>
            {({ field, meta }: IField) => (
              <div className="my-4">
                {labelText ? (
                  <label
                    htmlFor={name}
                    className="text-sm font-bold text-lightest tracking-wide"
                  >
                    {labelText}
                  </label>
                ) : null}
                <input
                  type={type}
                  className={inputStyle}
                  placeholder={placeholder}
                  {...field}
                />

                {meta.touched && meta.error && (
                  <div className="mt-2">
                    <span className="text-red-400 text-sm">
                      {meta?.touched && meta?.error}
                    </span>
                  </div>
                )}
              </div>
            )}
          </Field>
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  return <div>{renderContent()}</div>;
}
