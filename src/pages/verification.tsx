import { sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";

import logo from "../assets/img/brc.png";
import ImageLazyLoader from "../components/loaders/imageLazyLoader";
import { useAuth } from "../hooks/useAuth.hooks";
import { actionCodeSettings } from "../libs/firebase/actionCodeSettings";

export default function Verification() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && !user.emailVerified) {
      sendEmailVerification(user, actionCodeSettings);
    }
  }, []);

  return (
    <div className="flex items-center justify-around w-full h-screen">
      <div>
        <h1 className="text-4xl text-purple-500">To verify your account</h1>
        <p className="my-5 text-2xl text-center text-imageColor">
          Please check your email.
        </p>
        <p className="text-xl text-center text-purple-500">From Love BRC</p>
      </div>
      <div className="overflow-hidden rounded-xl">
        <ImageLazyLoader image={{ alt: "BRC", src: logo }} />
      </div>
    </div>
  );
}
