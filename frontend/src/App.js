import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import ProductPage from './pages/ProductPage';
import DetailedProductPage from './pages/DetailedProductPage';
import { useEffect, useState } from 'react';
import AdminNavbar from './Admin/admin components/AdminNavbar';
import AdminProduct from './Admin/admin pages/AdminProduct';
import AdminQueryPage from './Admin/admin pages/AdminQueryPage';
import AdminDashboard from './Admin/admin pages/AdminDashboard';
import { jwtDecode } from 'jwt-decode';
import ScrollToTop from './SrollToTop';
import CartPage from './pages/CartPage';
import AdminEditProductPage from './Admin/admin pages/AdminEditProductPage';
import AddressPage from './pages/AddressPage';
import AdminOrderPage from './Admin/admin pages/AdminOrderPage';
import SuccessPage from './pages/SuccessPage';


function App() {
  const [admin, setAdmin] = useState(false)
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.admin) {
        setAdmin(true)
      } else {
        setAdmin(false)
      }
    }

    let storedDeviceId = localStorage.getItem('deviceId');

    if (!storedDeviceId) {
      storedDeviceId = generateDeviceId();
      localStorage.setItem('deviceId', storedDeviceId);
    }

    setDeviceId(storedDeviceId);
  }, [])

  const generateDeviceId = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {admin ? <AdminNavbar /> : <Navbar />}
        <Routes>
          <Route exact path='/' element={admin ? <AdminDashboard /> : <HomePage />} />
          <Route exact path='/login' element={admin ? <AdminDashboard /> : <LoginPage />} />
          <Route exact path='/contact' element={admin ? <AdminDashboard /> : <ContactPage />} />
          <Route exact path='/product' element={admin ? <AdminDashboard /> : <ProductPage />} />
          <Route exact path='/product/:id' element={admin ? <AdminDashboard /> : <DetailedProductPage />} />
          <Route exact path='/address-page' element={admin ? <AdminDashboard /> : <AddressPage />} />
          <Route exact path='/order-placed-successfully' element={admin ? <AdminDashboard /> : <SuccessPage />} />
          <Route exact path='/cart' element={admin ? <AdminDashboard /> : <CartPage />} />
          <Route exact path='/product-management/' element={admin ? <AdminProduct /> : <HomePage />} />
          <Route exact path='/query-management/' element={admin ? <AdminQueryPage /> : <HomePage />} />
          <Route exact path='/edit-product/:id' element={admin ? <AdminEditProductPage /> : <HomePage />} />
          <Route exact path='/order-management' element={admin ? <AdminOrderPage /> : <HomePage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
