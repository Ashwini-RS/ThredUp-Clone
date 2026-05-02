import Adminsidebar from "./Adminsidebar";

function ManageUser() {

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/manageUsers")
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))
    }, [])

    const deleteUser = async (id) => {
        axios.delete(`https://thredup-clone.onrender.com/deleteUsers/${id}`)
        alert("User Deleted")
        window.location.reload();
    }

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
                            {users.map(user => {
                                return <tr key={user._id}>
                                    <td> {user.email} </td>
                                    <td> {user.phonenumber} </td>
                                    <td>
                                        <button className="delete-user-btn" onClick={() => deleteUser(user._id)} >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ManageUser;