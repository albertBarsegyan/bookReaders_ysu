import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useReducer,
} from "react";

import AddBookForm from "../components/forms/addBook.form";
import RegularModal from "../components/modal/regularModal";
import modalReducer, { ModalActions } from "../reducers/modal.reducer";
import {
  RegularModalVariants,
  RegularPopupVariants,
} from "../types/componentVariants.types";

interface IModalProviderProps {
  children: ReactElement;
}

type TModalContext = ReturnType<typeof useProvideModalData>;

export interface IModalState {
  isVisible: boolean;
  modalVariant: RegularModalVariants;
  popupVariant: RegularPopupVariants;
  text: string;
  customStyle: string;
  timeOutToHide: number;
  FormContainer: React.FC;
}
const initialState = {
  isVisible: false,
  modalVariant: RegularModalVariants.ALERT,
  popupVariant: RegularPopupVariants.PRIMARY,
  text: "",
  customStyle: "",
  timeOutToHide: 3,
  FormContainer: AddBookForm,
};

const useProvideModalData = () => {
  const [modalSettings, dispatch] = useReducer(modalReducer, initialState);
  const { isVisible, timeOutToHide } = modalSettings;

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>;

    if (isVisible && timeOutToHide > 0) {
      showTimeout = setTimeout(() => {
        dispatch({ type: ModalActions.HideModal });
      }, timeOutToHide * 1000);
    }

    if (timeOutToHide > 0) {
      return () => {
        clearTimeout(showTimeout);
      };
    }
  }, [isVisible, modalSettings.modalVariant, timeOutToHide]);

  const closeModal = () => {
    dispatch({ type: ModalActions.HideModal });
  };

  const provideModalSettings = (settings: Partial<IModalState>) => {
    dispatch({ type: ModalActions.ProvideData, data: settings });
  };

  return { provideModalSettings, closeModal, modalSettings };
};

const modalContext = createContext<TModalContext>({
  provideModalSettings: () => {},
  modalSettings: initialState,
  closeModal: () => {},
});

export const useModal = (): TModalContext => useContext(modalContext);

export function ModalProvider({ children }: IModalProviderProps) {
  const modalData = useProvideModalData();

  return (
    <modalContext.Provider value={modalData}>
      <>
        {modalData?.modalSettings?.isVisible ? (
          <RegularModal {...modalData?.modalSettings} />
        ) : null}
        {children}
      </>
    </modalContext.Provider>
  );
}
