import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowLeft, ChevronLeft, ChevronRight, Truck, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, testimonials } from '../data/products';
import ConditionBadge from '../components/ui/ConditionBadge';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ui/ProductCard';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [imgIndex, setImgIndex] = useState(0);
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) {
    return (
      <div className="container-pad py-20 text-center">
        <p className="text-[#9E8E78] text-lg mb-4">Product not found.</p>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size first!', {
        style: { background: '#1E160E', color: '#F5F0E8', border: '1px solid #2E2116' },
      });
      return;
    }
    addItem(product, selectedSize);
    openCart();
    toast.success('Added to cart! 🛍️', {
      style: { background: '#1E160E', color: '#F5F0E8', border: '1px solid #2E2116' },
      iconTheme: { primary: '#F59E0B', secondary: '#0A0705' },
    });
  };

  const productReviews = testimonials.slice(0, 3);

  return (
    <main className="min-h-screen">
      <div className="container-pad py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#9E8E78] mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 hover:text-[#F59E0B] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#F59E0B] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#F5F0E8]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#2E2116] mb-4 bg-[#150F0A]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[imgIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => (i - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#F59E0B] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setImgIndex((i) => (i + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#F59E0B] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4">
                <ConditionBadge condition={product.condition} size="md" />
              </div>
              {discount && discount >= 50 && (
                <div className="absolute top-4 right-4 bg-[#E11D48] text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      i === imgIndex ? 'border-[#F59E0B]' : 'border-[#2E2116] hover:border-[#F59E0B]/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-black text-[#F5F0E8] mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#2E2116]'}`}
                  />
                ))}
              </div>
              <span className="text-[#F59E0B] font-semibold">{product.rating}</span>
              <span className="text-[#9E8E78] text-sm">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-[#2E2116]">
              <span className="text-[#F59E0B] font-black text-4xl">₱{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <div>
                  <span className="text-[#9E8E78] text-lg line-through block">₱{product.originalPrice.toLocaleString()}</span>
                  {discount && (
                    <span className="text-[#22C55E] text-sm font-semibold">You save ₱{(product.originalPrice - product.price).toLocaleString()}</span>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-[#9E8E78] leading-relaxed mb-6">{product.description}</p>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#F5F0E8] font-semibold">Select Size</p>
                {selectedSize && (
                  <span className="text-[#F59E0B] text-sm font-semibold">Selected: {selectedSize}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    id={`size-${size}`}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-sm border transition-all ${
                      selectedSize === size
                        ? 'bg-[#F59E0B] text-[#0A0705] border-[#F59E0B]'
                        : 'bg-[#1E160E] text-[#9E8E78] border-[#2E2116] hover:border-[#F59E0B]/40 hover:text-[#F5F0E8]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock warning */}
            {product.stock === 1 && (
              <p className="text-[#E11D48] text-sm font-semibold mb-4 flex items-center gap-1.5">
                🔥 Last piece! Grab it before it's gone!
              </p>
            )}

            {/* CTAs */}
            <div className="flex gap-3 mb-6">
              <button
                id="product-add-to-cart"
                onClick={handleAddToCart}
                className="btn-primary flex-1 justify-center text-base py-4"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button
                id="product-favorite"
                onClick={() => {
                  toggleFavorite(product.id);
                  toast(fav ? 'Removed from wishlist' : 'Added to wishlist! 💛', {
                    style: { background: '#1E160E', color: '#F5F0E8', border: '1px solid #2E2116' },
                  });
                }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                  fav
                    ? 'bg-[#E11D48] text-white border-[#E11D48]'
                    : 'bg-[#1E160E] text-[#9E8E78] border-[#2E2116] hover:border-[#E11D48]/40 hover:text-[#E11D48]'
                }`}
              >
                <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust info */}
            <div className="space-y-3 py-5 border-t border-[#2E2116]">
              {[
                { icon: Truck, text: 'Free shipping on orders over ₱999' },
                { icon: Shield, text: 'Authentic item, quality checked' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#9E8E78]">
                  <Icon className="w-4 h-4 text-[#F59E0B]" />
                  {text}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-[#1E160E] border border-[#2E2116] text-[#9E8E78] px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-[#F5F0E8] mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {productReviews.map((r) => (
              <div key={r.id} className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-[#F5F0E8] font-semibold text-sm">{r.author}</p>
                    <p className="text-[#9E8E78] text-xs">{r.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[#9E8E78] text-sm leading-relaxed">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related items */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-[#F5F0E8] mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
