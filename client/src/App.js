import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layouts'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PagenotFound from './pages/PagenotFound';
import Register from './pages/auth/Register';
import { ToastContainer, toast } from 'react-toastify';
import Login from './pages/auth/Login';
import Dashboard from './user/Dashboard';
import PrivateRoute from './components/Routes/PrivateRoutes';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Users from './pages/Admin/Users';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Profile from './user/Profile';
import Orders from './user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
         <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
           <Route path="user" element={<Dashboard />} /> 
           <Route path="user/orders" element={<Orders />} />
           <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
           <Route path="admin" element={<AdminDashboard />} /> 
           <Route path="admin/create-category" element={<CreateCategory />} />
           <Route path="admin/create-product" element={<CreateProduct />} />
           <Route path="admin/products" element={<Products />} />
           <Route path="admin/product/:slug" element={<UpdateProduct />} />
           <Route path="admin/users" element={<Users />} />
        </Route>
        
        <Route path="/forgot-password" element={<ForgotPassword />}> </Route>
        <Route path="/register" element={<Register />}> </Route>
        <Route path="/login" element={<Login />}> </Route>
        <Route path="/about" element={<About />}> </Route>
        <Route path="/contact" element={<Contact />}> </Route>
        <Route path="/policy" element={<Policy />}> </Route>
        <Route path="*" element={<PagenotFound />}> </Route>
      </Routes> 
    </>
  );
}

export default App;
