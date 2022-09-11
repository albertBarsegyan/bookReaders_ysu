import React from "react";

import profilePictureAlt from "../../assets/img/profilePicture.jpg";
import { UserStage } from "../../types/user.types";
import ImageLazyLoader from "../loaders/imageLazyLoader";
import SpinnerLoader from "../loaders/spinner.loader";

export default function Profile({ user }: { user: UserStage | false }) {
  if (user)
    return (
      <div className="flex items-center justify-center">
        <div className="w-1/4 px-6 py-8 rounded-md shadow-md w-max-1/3">
          <div className="flex items-center justify-center w-full my-4">
            <div className="w-full">
              <ImageLazyLoader
                image={{
                  src: user?.photoURL ?? profilePictureAlt,
                  alt: "Profile",
                }}
              />
            </div>
          </div>

          <h1 className="text-2xl text-center text-primary">
            {user?.displayName ?? user?.email}
          </h1>
        </div>
      </div>
    );

  return <SpinnerLoader isFullScreen />;
}
