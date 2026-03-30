import { useLocation } from "react-router-dom"
import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import TheDresses from "./components/TheDresses";
import Login from "./components/Login";
import Kids from "./components/Kids";
import Footer from "./components/Footer";
import AdminLogin from "./Admin/components/AdminLogin"
import AdminDashboard from "./Admin/components/AdminDashboard";

function Routing() {

    const location = useLocation()
    const isAdmin = location.pathname.startsWith('/Admin/components')
    return (
        <>

            {!isAdmin && (
                <>
                  
                    <Header />
                </>
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/thedresses" element={<TheDresses />} />
                <Route path="/Login" element={<Login />} />
                <Route path='/Admin/components' element={<AdminLogin />} />
                <Route path='/Admin/components/AdminDashboard' element={<AdminDashboard />} />
               
            </Routes>

            {!isAdmin && (
                <>
                    <Footer />
                </>
            )}
        </>
    )
}

export default Routing;