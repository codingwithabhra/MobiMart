import Header3 from "../components/Header/Header3";
import Footer from "../components/Footer/Footer";
import Profiledetails from "../components/Profile/Profiledetails";

const Profile = () => {

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{ flexShrink: 0 }}>
        <Header3 />
      </header>

      <main
        style={{
          backgroundColor: "#f4ebff",
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div className="">
          <Profiledetails />
        </div>
      </main>

      <footer style={{ flexShrink: 0 }}>
        <Footer />
      </footer>
    </div>
  );
};

export default Profile;
