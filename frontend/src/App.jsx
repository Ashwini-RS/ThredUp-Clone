import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import TheDresses from "./components/TheDresses";
import Login from "./components/Login";
import Kids from "./components/Kids";
import Footer from "./components/Footer";
import './App.css';
// import Routing from "./Routing";
import Womens from "./components/Womens";
import Premium from "./components/Premium";
import Designer from "./components/Designer";
import SingleProductDetail from "./components/SingleProductDetail";
import AddToCart from "./components/AddToCart";
import SearchPage from "./components/Searchpage";
// import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/thedresses" element={<TheDresses />} />
        <Route path="/Womens" element={<Womens />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/Designer" element={<Designer />} />
        <Route path="/SingleProductDetail/:id" element={<SingleProductDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/AddToCart" element={<AddToCart />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
