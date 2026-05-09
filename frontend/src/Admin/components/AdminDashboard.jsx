
import { Link } from "react-router-dom";
import Adminsidebar from "./Adminsidebar";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    LineChart,

    ResponsiveContainer,
    Legend,
    Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    PieChart,
    Pie, Cell,

    BarChart,
    Bar
} from "recharts";

function AdminDashboard() {

    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [revenue, setRevenue] = useState([])
    const [statusData, setStatusData] = useState([]);
    const [barData, setBarData] = useState([])
    const [topProducts, setTopProducts] = useState([]);

    const COLORS = ["#FFC20A", "#17BECF", "#4caf50"];

    useEffect(() => {
        document.title = "Admin ThredUp"
    }, [])

    const [chartData, setChartData] = useState([]);
    const [areaChart, setAreaChart] = useState([])

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/top-products")
            .then(res => setTopProducts(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {

        const revenueMap = {};
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const date = `${d.getDate()} /${d.getMonth() + 1}/${d.getFullYear()}`;
            revenueMap[date] = 0;
        }

        orders.forEach(order => {
            if (order.paymentStatus === "Success") {
                const orderDate = new Date(order.orderDate);
                const date = `${orderDate.getDate()} /${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

                if (revenueMap[date] !== undefined) {
                    revenueMap[date] += order.finalTotal;
                }
            }
        });

        const data = Object.keys(revenueMap).map(date => ({
            date,
            amount: revenueMap[date]
        }));

        setChartData(data);

    }, [orders]);

    useEffect(() => {
        const revenueMap = {};
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
            revenueMap[date] = 0;
        }

        orders.forEach(order => {

            const orderDate = new Date(order.orderDate);
            const date = `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;

            if (revenueMap[date] !== undefined) {
                revenueMap[date] += 1;
            }

        });

        const data = Object.keys(revenueMap).map(date => ({
            date,
            amount: revenueMap[date]
        }));

        setAreaChart(data);
    }, [orders]);

    useEffect(() => {

        const statusCount = {
            Pending: 0,
            Processing: 0,
            Delivered: 0
        };

        orders.forEach(order => {
            if (order.orderStatus === "Pending") {
                statusCount.Pending += 1;
            }

            else if (order.orderStatus === "Order Processing") {
                statusCount.Processing += 1;
            }

            else if (order.orderStatus === "Order Delivered") {
                statusCount.Delivered += 1;
            }
        });

        const data = [
            { name: "Pending", value: statusCount.Pending },
            { name: "Processing", value: statusCount.Processing },
            { name: "Delivered", value: statusCount.Delivered }
        ];

        setStatusData(data);

    }, [orders]);

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/products")
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/manageOrders")
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/manageUsers")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("https://thredup-clone.onrender.com/admin/revenue")
            .then(res => setRevenue(res.data.revenue))
            .catch(err => console.log(err))
    }, [])

    const BarTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        background: "transparent",
                        padding: '4px 4px',
                        borderRadius: "8px",
                    }}
                >
                    <p style={{
                        margin: 0,
                        fontSize: "11px",
                        color: "#000",
                        fontWeight: "400"
                    }}>
                        {label}
                    </p>
                    <p style={{
                        margin: 0,
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "#000"
                    }}>
                        Orders: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    }

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
                                <p>{revenue}</p>
                            </div>

                            <div className="dasboard-card">
                                <h3>Total Orders</h3>
                                <p>{orders.length} </p>
                            </div>

                            <div className="dasboard-card">
                                <h3>Total Users</h3>
                                <p>{users.length} </p>
                            </div>

                            <div className="dasboard-card">
                                <h3>Total Products</h3>
                                <p>{products.length} </p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-chart-col1">

                        <div className="chart1 charts">
                            <h1  style={{fontSize:'24px', textAlign:'center', marginTop:'20px', color:'green' }}> Revenue Details </h1>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} >

                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

                                    <XAxis
                                        dataKey="date"
                                        axisLine={{ stroke: "#d1d5db" }}
                                        interval={0}
                                        tick={{ fontSize: 12, fill: "#6b7280" }}
                                    />

                                    <YAxis
                                        axisLine={{ stroke: "#d1d5db" }}
                                        tick={{ fontSize: 12, fill: "#6b7280" }}
                                    />

                                    <Tooltip cursor={{ stroke: "#ddd" }} isAnimationActive={false} />

                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="black"
                                        strokeWidth={2}
                                        dot={{
                                            r: 4,
                                            fill: "#fff",
                                            stroke: "#8e24aa",
                                            strokeWidth: 1
                                        }}

                                    />

                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="chart2 charts">
                            <h1 style={{fontSize:'24px', textAlign:'center', marginTop:'20px'}}> Order status</h1>
                            <ResponsiveContainer width="100%" height={420} margin={30}>
                                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>

                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="42%"
                                        outerRadius={80}

                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>

                                    <Legend verticalAlign="bottom" align="center" />
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    </div>


                </div>

                <div className="dashboard-chart-col2">
                    <div className="chart3">
                        {/* <ResponsiveContainer width="100%" aspect={3}>
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
                        </ResponsiveContainer> */}

                    </div>

                    {/* <div className="chart4">

                </div> */}

                </div>

            </div>

        </>
    );
}
export default AdminDashboard;

// http://localhost:5173/admin/dashboard to open the dashboard