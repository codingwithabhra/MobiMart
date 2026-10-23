import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Detailedproduct from "../components/Product_Details/Detailedproduct";

const ProductDetails = () => {
  return (
    <>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header style={{ flexShrink: 0 }}>
          <Header />
        </header>

        <main style={{ flex: 1, overflow: "scroll", scrollbarWidth: "none" }}>
          <div className="">
            <Detailedproduct />
          </div>
        </main>

        <footer style={{ flexShrink: 0 }}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default ProductDetails;
