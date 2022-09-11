import LoggedUserAccount from "../../components/account/loggedUserAccount";
import BookListContainer from "../../components/book/bookListContainer";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <LoggedUserAccount />
      <BookListContainer />
      <Footer />
    </>
  );
}
