
import { Link } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import {
    LineChart,
    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function AdminDashboard() {
    const pdata = [
        {
            name: "MongoDb",
            student: 11,
            fees: 120,
        },
        {
            name: "Javascript",
            student: 15,
            fees: 12,
        },
        {
            name: "PHP",
            student: 5,
            fees: 10,
        },
        {
            name: "Java",
            student: 10,
            fees: 5,
        },
        {
            name: "C#",
            student: 9,
            fees: 4,
        },
        {
            name: "C++",
            student: 10,
            fees: 8,
        },
    ];
    return (
        <>
            <Adminsidebar />

            <div className="admin-part">

                <div className="admin-content">
                    <div className="dashboard-container">
                        <h2 className="dashboard-title">Admin DashBoard</h2>

                        <div className="dashboard-card-container">
                            <div className="dasboard-card">
                                <h3>Total Revenue</h3>
                            </div>
                            <div className="dasboard-card">
                                <h3>Total Orders</h3>
                            </div>
                            <div className="dasboard-card">
                                <h3>Total Users</h3>
                            </div>
                            <div className="dasboard-card">
                                <h3>card name</h3>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-chart-col1">

                        <div className="chart1 charts">
                            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={pdata} width={500} height={500}>
                    <CartesianGrid />
                    <XAxis dataKey="name" interval={"preserveStartEnd"} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line
                        dataKey="student"
                        stroke="black"
                        activeDot={{ r: 8 }}
                    />
                    <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

                        </div>

                        <div className="chart2 charts">

                        </div>

                    </div>

                    <div className="dashboard-chart-col2">

                        <div className="chart3">


                        </div>

                        <div className="chart4">

                        </div>

                    </div>

                </div>
            </div>

        </>
    );
}
export default AdminDashboard;

// http://localhost:5173/admin/dashboard to open the dashboard