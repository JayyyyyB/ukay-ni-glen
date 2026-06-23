import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types';
import ConditionBadge from './ConditionBadge';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import toast from 'react-hot-toast';
import type { MouseEvent } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  const handleAddToCart = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes[0];
    addItem(product, defaultSize);
    openCart();
    toast.success(`Added to cart!`, {
      style: { background: '#1E160E', color: '#F5F0E8', border: '1px solid #2E2116' },
      iconTheme: { primary: '#F59E0B', secondary: '#0A0705' },
    });
  };

  const handleFavorite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    toast(fav ? 'Removed from wishlist' : 'Added to wishlist! 💛', {
      style: { background: '#1E160E', color: '#F5F0E8', border: '1px solid #2E2116' },
    });
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-hover"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="rounded-2xl overflow-hidden border border-[#2E2116] bg-[#150F0A] group"
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[3/4]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              loading="lazy"
            />
            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <ConditionBadge condition={product.condition} />
              {product.isNew && (
                <span className="inline-flex items-center bg-[#E11D48] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              {discount && discount >= 50 && (
                <span className="inline-flex items-center bg-[#F59E0B] text-[#0A0705] text-xs font-bold px-2 py-0.5 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Favorite button */}
            <button
              id={`fav-${product.id}`}
              onClick={handleFavorite}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                fav
                  ? 'bg-[#E11D48] text-white'
                  : 'bg-black/40 backdrop-blur-sm text-white hover:bg-[#E11D48]'
              }`}
            >
              <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
            </button>
            {/* Quick add to cart */}
            <button
              id={`cart-quick-${product.id}`}
              onClick={handleAddToCart}
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#0A0705] hover:bg-[#FCD34D] hover:scale-110 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
          {/* Info */}
          <div className="p-4">
            <p className="text-[#9E8E78] text-xs font-semibold uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h3 className="text-[#F5F0E8] font-semibold text-sm leading-snug mb-2 line-clamp-2">
              {product.name}
            </h3>
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-[#F59E0B] text-xs font-semibold">{product.rating}</span>
              <span className="text-[#9E8E78] text-xs">({product.reviewCount})</span>
            </div>
            {/* Price */}
            <div className="flex items-end gap-2">
              <span className="text-[#F59E0B] font-bold text-lg">₱{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-[#9E8E78] text-sm line-through">
                  ₱{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
