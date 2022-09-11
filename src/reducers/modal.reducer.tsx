import { IModalState } from "../hooks/useModal.hooks";

export enum ModalActions {
  ProvideData = "provide-data",
  HideModal = "hide-modal",
}

type Action = { type: ModalActions; data?: Partial<IModalState> };

export default function modalReducer(state: IModalState, action: Action) {
  switch (action?.type) {
    case ModalActions.ProvideData:
      return { ...state, isVisible: true, ...action?.data };
    case ModalActions.HideModal:
      return { ...state, isVisible: false };
  }
}
