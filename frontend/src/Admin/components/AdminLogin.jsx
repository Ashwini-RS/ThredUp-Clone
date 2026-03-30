import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    useEffect(() => {
        document.title = "ThredUp Admin"
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (email === 'thredup.admin@gmail.com' && password === "thredup-admin") {
                alert("Successfully Logined")
                navigate('/Admin/Components/AdminDashboard')
            }
            else {
                alert("Login Failed")
            }


        } catch (err) {
            console.log("Error:", err);
        }

    };
    return (
        <div className="admin-section">
            <form className="Admin-form" onSubmit={handleSubmit}>

                <h2> THREDUP ADMIN </h2>
                <h3> LOGIN TO THREDUP ADMIN </h3>

                <input type="email"
                    name="email"
                    id="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <br />

                <input type="password"
                    name="password"
                    id="password"
                    placeholder="Enter the Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit"  className="admin-btn-login">LOGIN</button>

            </form>
        </div>
    );
}

export default AdminLogin;

