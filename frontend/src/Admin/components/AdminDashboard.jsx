// import { Link } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";

function AdminDashboard() {
    return (
        <>
            {/* <div className="admin-topbar">

                <div className="admin-logo-section">
                    <img src="/images/logo-thredup.svg" className="admin-logo" />
                    <h2 className="admin-title">Admin</h2>
                </div>

                <div className="admin-right">
                    <p className="admin-panel">Admin Panel</p>
                </div>

            </div>

            <div className="admin-container">

                <div className="thredup-sidebar">

                    <Link to="/Admin/AdminDashboard" className="admin-task">
                        <i className="fa-solid fa-table-columns"></i>  Dashboard
                    </Link>
                    <hr className="sidebar-line" />

                    <Link to="/Admin/AddProducts" className="admin-task">
                        <i className="fa-solid fa-box-open"></i>   Add Products
                    </Link>
                    <hr className="sidebar-line" />

                    <Link to="/Admin/ManageProducts" className="admin-task">
                        <i className="fa-solid fa-clipboard-list"></i>Manage Products
                    </Link>
                    <hr className="sidebar-line" />

                    <Link to="/Admin/ManageOrder" className="admin-task">
                        <i className="fa-solid fa-truck"></i>Manage Order
                    </Link>
                    <hr className="sidebar-line" />

                    <Link to="/Admin/ManageUser" className="admin-task">
                        <i className="fa-solid fa-user-group"></i> Manage User
                    </Link>
                    <hr className="sidebar-line" />

                    <Link to=" " className="admin-task">
                        <i className="fa-solid fa-user-group"></i> Logut
                    </Link>
                    <hr className="sidebar-line" />

                </div> 
            </div>  */}

            <Adminsidebar />
            <div className="admin-content">
                <img
                    src="/images/ThredUP-banner1.webp"
                    alt="dashboard"
                    className="content-image"
                />
            </div>


        </>
    );
}
export default AdminDashboard;

// http://localhost:5173/admin/dashboard to open the dashboard