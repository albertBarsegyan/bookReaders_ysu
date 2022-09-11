import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { AppRoutes } from "../../constants/route.constants";
import { useAuth } from "../../hooks/useAuth.hooks";
import { IModalState, useModal } from "../../hooks/useModal.hooks";
import { usePopup } from "../../hooks/usePopup.hooks";
import useStep from "../../hooks/useStep.hooks";
import {
  registerSchemaFirst,
  registerSchemaSecond,
  registerSchemaThird,
} from "../../schemas/register.schema";
import { addDocumentToCollection } from "../../services/firebase/addDocumentToCollection";
import { updateProfileData } from "../../services/firebase/updateProfileData";
import { RegularPopupVariants } from "../../types/componentVariants.types";
import RegularButton from "../buttons/regularButton";
import CustomInput, { RegularInputVariants } from "../inputs/customInput";
import ImageInput from "../inputs/imageInput";
import SpinnerLoader from "../loaders/spinner.loader";

interface IFirstStepComponentProps {
  handleNext: () => void;
}
interface ISecondStepComponentProps {
  handleNext: () => void;
  handlePrev: () => void;
}

interface IThirdStepComponentProps {
  handlePrev: () => void;
}

export default function RegisterForm() {
  const { stepData, handleIncrement, handleDecrement } = useStep();

  const formSteps = (step: number) => {
    switch (step) {
      case 0:
        return <FirstStep handleNext={handleIncrement} />;
      case 1:
        return (
          <SecondStep
            handleNext={handleIncrement}
            handlePrev={handleDecrement}
          />
        );
      case 2:
        return <ThirdStep handlePrev={handleDecrement} />;
    }
  };

  return <>{formSteps(stepData?.step)}</>;
}

function FirstStep({ handleNext }: IFirstStepComponentProps) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const { providePopupSettings } = usePopup();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ email, password }, { resetForm }) => {
      setLoading(true);
      signUp(email, password).then((res) => {
        if (res.popupVariant === RegularPopupVariants.DANGER) {
          providePopupSettings(res);
          setLoading(false);
          resetForm();
          return;
        }
        setLoading(false);
        handleNext();
      });
    },
    validationSchema: registerSchemaFirst,
  });

  if (loading) return <SpinnerLoader isFullScreen />;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          labelText="Email Address"
          variant={RegularInputVariants.FormikInput}
          placeholder="Type email"
          name="email"
        />

        <CustomInput
          labelText="Password"
          type="password"
          name="password"
          variant={RegularInputVariants.FormikInput}
          placeholder="Enter your password"
        />
        <CustomInput
          labelText="Confirm Password"
          type="password"
          name="confirmPassword"
          variant={RegularInputVariants.FormikInput}
          placeholder="Repeat password"
        />

        <div className="flex justify-end mt-5">
          <RegularButton type="submit">Next</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}

function SecondStep({ handleNext, handlePrev }: ISecondStepComponentProps) {
  const { provideModalSettings } = useModal();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      profilePicture: undefined,
    },
    onSubmit: ({ firstName, lastName, profilePicture }, { resetForm }) => {
      setLoading(true);
      updateProfileData(firstName, lastName, profilePicture).then((res) => {
        if (res?.popupVariant === RegularPopupVariants.SUCCESS) {
          handleNext();
          setLoading(false);
          return;
        }
        setLoading(false);
        resetForm();
        provideModalSettings(res as IModalState);
      });
    },
    validationSchema: registerSchemaSecond,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target?.files?.[0];

    formik.setFieldValue("profilePicture", inputFile);
  };

  if (loading) return <SpinnerLoader isFullScreen />;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          labelText="First Name"
          variant={RegularInputVariants.FormikInput}
          placeholder="Type your first name"
          name="firstName"
        />

        <CustomInput
          labelText="Last name"
          name="lastName"
          variant={RegularInputVariants.FormikInput}
          placeholder="Enter your last name"
        />

        <ImageInput
          placeholder="Upload image from device"
          name="profilePicture"
          onChange={handleImageUpload}
        />

        <div className="flex justify-end mt-5">
          {/* <RegularButton type="button" handleClick={handlePrev}>
            Previous
          </RegularButton> */}

          <RegularButton type="submit">Next</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}

function ThirdStep({ handlePrev }: IThirdStepComponentProps) {
  const { user, makeAccessToAuthApp } = useAuth();
  const [loader, setLoader] = useState(false);
  const { providePopupSettings } = usePopup();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      booksCount: 1,
    },
    onSubmit: ({ booksCount }, { resetForm }) => {
      if (user) {
        setLoader(true);

        addDocumentToCollection(FirebaseCollectionNames.Users, user.uid, {
          name: user.displayName,
          email: user.email,
          profilePicture: user.photoURL,
          uid: user.uid,
        });
        addDocumentToCollection(FirebaseCollectionNames.Readers, user?.uid, {
          booksCount,
          readCount: 0,
          bookList: [],
        }).then((res) => {
          if (res?.popupVariant === RegularPopupVariants.DANGER) {
            providePopupSettings(res as IModalState);
            setLoader(false);
            resetForm();
            return;
          }
          setLoader(false);
          makeAccessToAuthApp();
          navigate(AppRoutes.authenticatedRoutes.home, {
            replace: true,
          });
        });
      }
    },
    validationSchema: registerSchemaThird,
  });

  if (loader) return <SpinnerLoader isFullScreen />;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          labelText={`How many books do you want to read in ${new Date().getFullYear()}`}
          variant={RegularInputVariants.FormikInput}
          placeholder="Type books count"
          name="booksCount"
        />

        <div className="mt-5">
          {/* <RegularButton type="button" handleClick={handlePrev}>
            Previous
          </RegularButton> */}
          <RegularButton type="submit">Lest start</RegularButton>
        </div>
      </form>
    </FormikProvider>
  );
}
