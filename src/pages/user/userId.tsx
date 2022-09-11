import React from "react";
import { useParams } from "react-router-dom";

import UserAccount from "../../components/account/userAccount";
import Footer from "../../components/footer/footer";
import SpinnerLoader from "../../components/loaders/spinner.loader";
import Navbar from "../../components/navbar/navbar";
import BooksTable from "../../components/table/bookTable";
import { FirebaseCollectionNames } from "../../constants/firebase.constants";
import { useFireStoreSnapshot } from "../../hooks/useFireStoreSnapshot.hooks";

export default function UserId() {
  const { uid } = useParams();

  const [readingData] = useFireStoreSnapshot({
    collectionName: FirebaseCollectionNames.Readers,
    documentName: uid,
  });

  const [userProfileData] = useFireStoreSnapshot({
    collectionName: FirebaseCollectionNames.Users,
    documentName: uid,
  });

  const isLoading = !userProfileData || !readingData;

  if (isLoading) {
    return <SpinnerLoader isFullScreen />;
  }

  return (
    <div>
      <Navbar />
      <UserAccount
        userProfileData={userProfileData}
        readingData={readingData}
      />
      <BooksTable isOwner={false} bookList={readingData.bookList} />
      <Footer />
    </div>
  );
}
