import Footer from "./components/layout/Footer/Footer"
import CustomedNavbar from "./components/layout/Navbar/CustomedNavbar"
import RouteFile from "./routes"
function App() {

  return (
    <>
      <div>
        <CustomedNavbar />
        <RouteFile />
        <Footer />
      </div >
    </>
  )
}

export default App
