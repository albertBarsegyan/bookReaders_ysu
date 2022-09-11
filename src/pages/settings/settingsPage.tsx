import React from "react";

import EditAccount from "../../components/account/editAccount";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

export default function SettingsPage() {
  return (
    <>
      <Navbar />
      <EditAccount />
      <Footer />
    </>
  );
}
