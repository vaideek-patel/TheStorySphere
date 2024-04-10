import Footer from "./components/layout/Footer/Footer"
import CustomedNavbar from "./components/layout/Navbar/CustomedNavbar"
import RouteFile from "./routes"
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <div>
        <CustomedNavbar />
        <RouteFile />
        <Footer />

        <ToastContainer
          autoClose={2000}
          closeOnClick
          pauseOnFocusLoss={false}
          pauseOnHover
          transition={Bounce}
        />
      </div >
    </>
  )
}

export default App
