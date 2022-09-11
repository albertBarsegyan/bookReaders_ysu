import React from "react";
import { Link } from "react-router-dom";

import RegisterForm from "../../components/forms/registerForm";
import { AppRoutes } from "../../constants/route.constants";

export default function Register() {
  return (
    <div>
      <div className="relative top-20 w-full flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl text-primary tracking-wide ml-2 font-semibold">
            Register
          </h1>
        </div>
        <div className="w-1/3">
          <RegisterForm />
        </div>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="cursor-pointer text-lightest hover:text-primary"
            to={AppRoutes.unauthenticatedRoutes.login}
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
