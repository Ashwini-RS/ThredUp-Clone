import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboard from './Admin/components/AdminDashboard.jsx'
import AdminLogin from './Admin/components/AdminLogin.jsx'
import AddProducts from './Admin/components/AddProducts.jsx'
import ManageProducts from './Admin/components/ManageProducts.jsx'
import Editproducts from './Admin/components/Editproducts.jsx'
import ManageOrder from './Admin/components/ManageOrder.jsx'
import ManageUser from './Admin/components/ManagerUser.jsx'
import EditStatus from './Admin/components/EditStatus.jsx'


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/AddProducts" element={<AddProducts />} />

        <Route path="/admin/ManageProducts" element={<ManageProducts />} />
        <Route path="/admin/Editproducts/:id" element={<Editproducts />} />

        <Route path="/admin/ManageOrder" element={<ManageOrder />} />
        <Route path="/admin/EditStatus/:id" element={<EditStatus />} />

        <Route path="/admin/ManageUser" element={<ManageUser />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
