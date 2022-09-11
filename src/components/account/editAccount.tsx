import React from "react";

import { useAuth } from "../../hooks/useAuth.hooks";
import ToggleButton from "../buttons/toggleButton";
import EditFullNameForm from "../forms/editFullName.form";
import EditImageForm from "../forms/editImage.form";
// import EditPassword from "../forms/editPassword";
import SpinnerLoader from "../loaders/spinner.loader";

export default function EditAccount() {
  const { user } = useAuth();

  if (user)
    return (
      <div className="flex justify-center mt-5">
        <div className="w-1/3">
          <ToggleButton text="Change names">
            <EditFullNameForm user={user} />
          </ToggleButton>

          {/* <ToggleButton text="Change password">
            <EditPassword user={user} />
          </ToggleButton> */}

          <ToggleButton text="Change image">
            <EditImageForm />
          </ToggleButton>
        </div>
      </div>
    );

  return <SpinnerLoader isFullScreen />;
}
