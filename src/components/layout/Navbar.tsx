import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Bundles', href: '/shop?tab=bundles' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const { favoriteCount } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-2xl shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="container-pad flex items-center gap-4 h-18 py-3">
          {/* Logo */}
          <Link to="/" id="nav-logo" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#E11D48] flex items-center justify-center">
              <span className="text-white font-black text-sm">UK</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-black text-lg leading-none text-gradient">UkayFinds</p>
              <p className="text-[10px] text-[#9E8E78] leading-none tracking-widest uppercase">Philippines</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="px-4 py-2 text-sm font-semibold text-[#F5F0E8] hover:text-[#F59E0B] transition-colors rounded-full hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Search bar - desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 glass-light rounded-full px-4 py-2 w-64">
            <Search className="w-4 h-4 text-[#9E8E78] shrink-0" />
            <input
              id="nav-search"
              type="text"
              placeholder="Search ukay finds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-[#F5F0E8] placeholder-[#9E8E78] outline-none w-full"
            />
          </form>

          {/* Icon group */}
          <div className="flex items-center gap-1">
            {/* Mobile search toggle */}
            <button
              id="nav-search-toggle"
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#F59E0B] transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Favorites */}
            <Link
              to="/favorites"
              id="nav-favorites"
              className="relative w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#F59E0B] transition-colors"
            >
              <Heart className="w-5 h-5" />
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E11D48] text-white text-[10px] font-bold flex items-center justify-center">
                  {favoriteCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              id="nav-cart"
              onClick={toggleCart}
              className="relative w-10 h-10 flex items-center justify-center text-[#F5F0E8] hover:text-[#F59E0B] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F59E0B] text-[#0A0705] text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              id="nav-mobile-menu"
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#F5F0E8]"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#2E2116] px-4 py-3"
            >
              <form onSubmit={handleSearch} className="flex items-center gap-2 glass-light rounded-full px-4 py-2">
                <Search className="w-4 h-4 text-[#9E8E78]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search ukay finds..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm text-[#F5F0E8] placeholder-[#9E8E78] outline-none flex-1"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#2E2116] bg-[#0A0705]"
            >
              <div className="container-pad py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="px-4 py-3 text-[#F5F0E8] font-semibold hover:text-[#F59E0B] hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer */}
      <div className="h-18" />
    </>
  );
}
