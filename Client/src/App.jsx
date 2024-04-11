import Footer from "./components/layout/Footer/Footer"
import CustomedNavbar from "./components/layout/Navbar/CustomedNavbar"
import RouteFile from "./routes"
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from 'react';


function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  )
}

export default App
