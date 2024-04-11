import Footer from "./components/layout/Footer/Footer"
import CustomedNavbar from "./components/layout/Navbar/CustomedNavbar"
import RouteFile from "./routes"
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from 'react';
import { RouterProvider } from "react-router-dom";
import Loader from "./components/common/Loader";


function App() {
  const router = RouteFile()
  return (
    <>
      <Suspense fallback={<div><Loader /></div>}>
        <div>
          {/* <CustomedNavbar /> */}
          {/* <RouteFile /> */}
          <RouterProvider router={router} />
          {/* <Footer /> */}
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
