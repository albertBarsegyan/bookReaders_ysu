import { Link } from "react-router-dom";

import logo from "../../assets/img/brc.png";
import { AppRoutes } from "../../constants/route.constants";
import { StorageConstants } from "../../constants/storage.constants";
import { useAuth } from "../../hooks/useAuth.hooks";
import useStorage from "../../hooks/useStorage.hooks";
import { IconVariants } from "../../types/icon.types";
import ChartIcon from "../icons/chart.icon";
import LogoutIcon from "../icons/logout.icon";
import UsersIcon from "../icons/users.icon";
import CustomLink from "../links/customLink";
import ImageLazyLoader from "../loaders/imageLazyLoader";

export default function Navbar() {
  const { signOut } = useAuth();
  const { removeDataFromStorage } = useStorage();
  const { removeDataFromStorage: removeDataFromLocalStorage } =
    useStorage(localStorage);

  const handleSignOut = () => {
    signOut();
    removeDataFromStorage(StorageConstants.user);
    removeDataFromLocalStorage(StorageConstants.isAccessible);
  };

  return (
    <nav className="bg-secondary border-gray-200 sm:px-4 py-2.5 shadow-sm">
      <div className="flex items-center justify-between px-20 mx-auto">
        <div className="overflow-hidden rounded-sm">
          <Link to={AppRoutes.authenticatedRoutes.home} className="flex">
            <ImageLazyLoader
              image={{ alt: "BRC", src: logo, width: 50, height: 50 }}
            />
          </Link>
        </div>

        <div className="items-center justify-between w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col items-center justify-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <CustomLink
                Icon={<ChartIcon iconVariant={IconVariants.PRIMARY} />}
                path={AppRoutes.authenticatedRoutes.settings}
                text="Profile settings"
              />
            </li>
            <li>
              <CustomLink
                Icon={<UsersIcon iconVariant={IconVariants.PRIMARY} />}
                path={AppRoutes.authenticatedRoutes.users}
                text="Friends progress"
              />
            </li>
            <li>
              <CustomLink
                path={AppRoutes.unauthenticatedRoutes.login}
                Icon={<LogoutIcon iconVariant={IconVariants.PRIMARY} />}
                text="Log out"
                onClick={handleSignOut}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
