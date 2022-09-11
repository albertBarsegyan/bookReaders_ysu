import React from "react";

import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import UsersList from "../../components/lists/usersList";
import Navbar from "../../components/navbar/navbar";

export default function Users() {
  return (
    <div>
      <Navbar />
      <Header text="Friends" />
      <UsersList />
      <Footer />
    </div>
  );
}
