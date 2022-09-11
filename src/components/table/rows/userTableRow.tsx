import React from "react";
import { Link } from "react-router-dom";

import bg from "../../../assets/img/profilePicture.jpg";
import { AppRoutes } from "../../../constants/route.constants";
import { IUserInfo } from "../../../types/user.types";

export default function UserTableRow({
  userInfoData,
}: {
  userInfoData: IUserInfo;
}) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 text-sm font-medium text-primary whitespace-nowrap">
        <img
          width={100}
          src={userInfoData.profilePicture ?? bg}
          alt="profile"
        />
      </td>
      <td className="px-6 py-4 text-sm font-light text-purple-400 whitespace-nowrap">
        {userInfoData.name}
      </td>
      <td className="px-6 py-4 text-sm font-light text-primary whitespace-nowrap">
        {userInfoData.email}
      </td>
      <td className="px-6 py-4 text-sm font-light text-purple-400 whitespace-nowrap">
        <Link
          className="underline decoration-solid"
          to={AppRoutes.authenticatedRoutes.userByUid(userInfoData.uid)}
        >
          View Profile
        </Link>
      </td>
    </tr>
  );
}
