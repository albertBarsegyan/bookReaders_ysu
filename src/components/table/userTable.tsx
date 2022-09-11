import { StorageConstants } from "../../constants/storage.constants";
import useStorage from "../../hooks/useStorage.hooks";
import { IUserInfo } from "../../types/user.types";
import UserTableRow from "./rows/userTableRow";

export default function UserTable({ users }: { users: IUserInfo[] }) {
  const { getDataFromStorage } = useStorage();
  const userUid = getDataFromStorage(StorageConstants.user);

  return (
    <>
      <div className="w-5/6 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-left text-purple-600 text-md"
                      >
                        Profile picture
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-left text-purple-600 text-md"
                      >
                        Full Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-left text-purple-600 text-md"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 font-medium text-left text-purple-600 text-md"
                      >
                        Profile
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userInfoData) => {
                      if (userInfoData.uid === userUid) return null;

                      return (
                        <UserTableRow
                          key={userInfoData.uid}
                          userInfoData={userInfoData}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
