import { Link } from "react-router-dom";

import bg from "../../assets/img/login_bg.png";
import LoginForm from "../../components/forms/loginForm";
import ImageLazyLoader from "../../components/loaders/imageLazyLoader";
import { AppRoutes } from "../../constants/route.constants";

export default function Login() {
  return (
    <div className="py-5 lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="flex justify-center py-12 lg:bg-white lg:justify-start lg:px-12">
          <div className="flex items-center cursor-pointer">
            <div className="ml-2 text-2xl font-semibold tracking-wide text-primary">
              <h1> Book Readers Club</h1>
            </div>
          </div>
        </div>
        <div className="px-12 mt-10 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2 className="text-4xl font-semibold text-center text-primary font-display lg:text-left xl:text-5xl xl:text-bold">
            Welcome to BRC
          </h2>
          <div className="mt-12">
            <LoginForm />
            <div className="mt-12 text-sm font-semibold text-center text-gray-700 font-display">
              Don't have an account ?
              <Link
                className="cursor-pointer text-lightest hover:text-primary"
                to={AppRoutes.unauthenticatedRoutes.register}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="items-center justify-center flex-1 hidden h-auto lg:flex">
        <div className="w-1/2">
          <ImageLazyLoader
            image={{
              src: bg,
              alt: "Book readers club",
            }}
          />
        </div>
      </div>
    </div>
  );
}
