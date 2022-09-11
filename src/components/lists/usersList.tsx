import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { useFireStoreSnapshotPaginated } from "../../hooks/useFireStoreSnapshot.hooks";
import RegularButton from "../buttons/regularButton";
import UserTable from "../table/userTable";

export default function UsersList() {
  const { response: users, getNextPage } = useFireStoreSnapshotPaginated({
    collectionName: FirebaseCollectionNames.Users,
    dataLimit: 10,
  });

  const handleClick = () => {
    getNextPage();
  };

  if (users) {
    return (
      <>
        <UserTable users={users} />
        <div className="flex items-center justify-center">
          <RegularButton handleClick={handleClick}>Load more</RegularButton>
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center">
      <span className="text-2xl text-primary">Empty</span>
    </div>
  );
}
