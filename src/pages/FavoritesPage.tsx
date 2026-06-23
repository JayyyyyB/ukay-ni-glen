import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="min-h-screen">
      <div className="bg-[#0D0905] border-b border-[#2E2116] py-10">
        <div className="container-pad">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-[#E11D48] fill-current" />
            <h1 className="text-4xl font-black text-[#F5F0E8]">My <span className="text-gradient">Wishlist</span></h1>
          </div>
          <p className="text-[#9E8E78]">{favoriteProducts.length} saved {favoriteProducts.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="container-pad py-10">
        {favoriteProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 rounded-3xl bg-[#1E160E] flex items-center justify-center mb-6"
            >
              <Heart className="w-12 h-12 text-[#2E2116]" />
            </motion.div>
            <h2 className="text-2xl font-black text-[#F5F0E8] mb-3">Nothing saved yet</h2>
            <p className="text-[#9E8E78] mb-8 max-w-sm">
              Tap the ❤️ on any item to save it here for later. Start browsing!
            </p>
            <Link to="/shop" id="wishlist-shop-btn" className="btn-primary">
              <ShoppingBag className="w-5 h-5" /> Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {favoriteProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
