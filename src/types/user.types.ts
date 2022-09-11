import { User } from "firebase/auth";

import { TBookData } from "./bookData.types";

export type UserStage = User | null;

export interface IReadingData {
  bookList: TBookData[];
  booksCount: number;
}

export interface IUserInfo {
  email: string;
  name: string;
  profilePicture: string;
  uid: string;
}
