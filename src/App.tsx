import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen bg-[#0A0705] text-[#F5F0E8]">
            <Navbar />
            <CartDrawer />
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
            <Footer />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
