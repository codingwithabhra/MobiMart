import { useState } from "react";
import Header2 from "./components/Header/Header2";
import Footer from "./components/Footer/Footer";
import Landingcomponent from "./components/LandingPage/Landingcomponent";

function App() {

  return (
    <>
      <header>
        <Header2 />
      </header>

      <main>
        <Landingcomponent />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
