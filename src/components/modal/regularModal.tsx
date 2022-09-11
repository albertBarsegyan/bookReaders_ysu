import classNames from "classnames";

import { useModal } from "../../hooks/useModal.hooks";
import { RegularModalVariants } from "../../types/componentVariants.types";
import RegularButton, { RegularButtonVariants } from "../buttons/regularButton";
import CloseIcon from "../icons/close.icon";

interface IRegularModalProps {
  modalVariant?: RegularModalVariants;
  FormContainer?: React.FC;
  handleCancel?: () => void;
  handleDelete?: () => void;
  customStyle?: string;
  text: string;
}

export default function RegularModal({
  modalVariant = RegularModalVariants.ALERT,
  FormContainer,
  handleCancel,
  handleDelete,
  customStyle,
}: IRegularModalProps) {
  const { closeModal } = useModal();

  const containerStyles = classNames({
    "fixed right-4 top-4 max-w-4xl w-1/3 z-10": !customStyle,
    customStyle: !!customStyle,
  });

  const renderModalVariants = (variant: RegularModalVariants) => {
    switch (variant) {
      case RegularModalVariants.FORM:
        return (
          <div
            role="form"
            className="fixed top-0 left-0 w-full h-screen bg-gray-900 flex justify-start items-center flex-col"
          >
            <div className="relative flex flex-row justify-end items-end w-full px-20 mt-5">
              <RegularButton
                handleClick={closeModal}
                variant={RegularButtonVariants.DANGER}
                Icon={<CloseIcon />}
              />
            </div>
            <div className="relative top-20 w-1/3 flex justify-center">
              {FormContainer ? <FormContainer /> : null}
            </div>
          </div>
        );

      case RegularModalVariants.CONFIRM:
        return (
          <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
              <div className="">
                <div className="text-center p-5 flex-auto justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 flex items-center text-red-500 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                  <p className="text-sm text-gray-500 px-8">
                    Do you really want to delete your account? This process
                    cannot be undone
                  </p>
                </div>

                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    onClick={handleCancel}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={containerStyles}>{renderModalVariants(modalVariant)}</div>
  );
}
