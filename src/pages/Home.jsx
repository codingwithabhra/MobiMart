import React from "react";
import HomeComponent from "../components/Home/HomeComponent";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <HomeComponent />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
