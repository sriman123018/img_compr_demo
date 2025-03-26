import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import Hero from "./components/Hero";
import Navbar from "./components/nav";
import ImageUpload from "./components/Imgupload";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="mb-5 w-[100vw]">
      <Navbar></Navbar>
      <Hero></Hero>
      <ImageUpload></ImageUpload>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
