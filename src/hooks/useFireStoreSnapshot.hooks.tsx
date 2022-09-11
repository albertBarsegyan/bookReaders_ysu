import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { FirebaseCollectionNames } from "../constants/firebase.constants";
import { db } from "../libs/firebase/firebaseConfig";

export const useFireStoreSnapshot = ({
  collectionName = FirebaseCollectionNames.Readers,
  documentName,
}: {
  collectionName: FirebaseCollectionNames;
  documentName?: string;
}) => {
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    const unsubscribe =
      documentName &&
      onSnapshot(doc(db, collectionName, documentName), (doc) => {
        setResponse(doc?.data());
      });

    if (typeof unsubscribe === "function") {
      return () => unsubscribe();
    }
  }, [collectionName, documentName]);

  return [response];
};

export const useFireStoreSnapshotPaginated = ({
  collectionName = FirebaseCollectionNames.Readers,
  dataLimit = 20,
  documentName,
  orderByName = "name",
}: {
  collectionName: FirebaseCollectionNames;
  dataLimit?: number;
  documentName?: string | undefined;
  orderByName?: string;
}) => {
  const [response, setResponse] = useState<any[]>([]);
  const [lastVisible, setLastVisible] = useState<any>();

  const queryCollection = documentName
    ? collection(db, collectionName, documentName)
    : collection(db, collectionName);

  const firstQuery = query(
    queryCollection,
    orderBy(orderByName),
    limit(dataLimit)
  );

  const getNextPage = () => {
    const next = query(
      collection(db, collectionName),
      orderBy(orderByName),
      startAfter(lastVisible),
      limit(dataLimit)
    );

    getDocs(next).then((snapshots) => {
      setLastVisible(snapshots.docs[snapshots.docs.length - 1]);
      snapshots.forEach((snapshot) => {
        setResponse((prev) => {
          return [...prev, snapshot.data()];
        });
      });
    });
  };

  useEffect(() => {
    getDocs(firstQuery).then((snapshots) => {
      setLastVisible(snapshots.docs[snapshots.docs.length - 1]);

      snapshots.forEach((snapshot) => {
        setResponse((prev) => {
          return [...prev, snapshot.data()];
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    response,
    getNextPage,
  };
};
