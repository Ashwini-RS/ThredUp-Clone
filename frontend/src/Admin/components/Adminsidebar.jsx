import { Link, useNavigate } from "react-router-dom";

function Adminsidebar() {
    const navigate = useNavigate()
    const admin = localStorage.getItem('admin')
    const handleLogout = () => {
        localStorage.removeItem('admin')
        alert('logout success')
        navigate("/admin/login")
    }
    return (
        <>
            <div className="admin-topbar" style={{position:'sticky', top:0}}>

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

                    {/* <div className="admin-logo-section">
                        <img src="/images/logo-thredup.svg" className="admin-logo" />
                        <h2 className="admin-title">Admin</h2>
                    </div> */}

                    <Link to="/admin/dashboard" className="admin-task">
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

                    <Link to="/Admin/ManageUser" className="admin-task">
                        <i className="fa-solid fa-user-group"></i> Manage Contact
                    </Link>
                    <hr className="sidebar-line" />

                    <div onClick={handleLogout} className="admin-task">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </div>
                    <hr className="sidebar-line" />

                </div>
            </div>
        </>
    );
}

export default Adminsidebar;