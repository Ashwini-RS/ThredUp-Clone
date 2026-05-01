import Adminsidebar from "./Adminsidebar";

function ManageUser() {
    return (
        <>

            <Adminsidebar />
            <div className="manage-users-container">

                <div className="manage-users-header">
                    <h2>Manage Users</h2>
                </div>

                <div className="manage-users-table-wrapper">
                    <table className="manage-users-table">
                        <thead>
                            <tr>
                                <th>User Email</th>
                                <th>Mobile Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>xyz@gmail.com</td>
                                <td>9988776655</td>
                                <td>
                                    <button className="delete-user-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td>abc@gmail.com</td>
                                <td>9876543210</td>
                                <td>
                                    <button className="delete-user-btn">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
}

export default ManageUser;