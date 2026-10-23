import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Checkedoutproducts from "../components/CheckOut/Checkedoutproducts";

const Checkout = () => {

  return (
    <>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header style={{ flexShrink: 0 }}>
          <Header />
        </header>

        <main
          style={{
            backgroundColor: "#f4ebff",
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="container-fluid">
            <Checkedoutproducts />
          </div>
        </main>

        <footer style={{ flexShrink: 0 }}>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Checkout;
