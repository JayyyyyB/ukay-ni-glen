import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../ui/ProductCard';

const featured = products.filter((p) => p.isFeatured).slice(0, 8);

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  };

  return (
    <section className="section-pad bg-[#0D0905]">
      <div className="container-pad">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-[#E11D48]" />
              <p className="text-[#E11D48] text-sm font-semibold uppercase tracking-widest">Hot Picks</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#F5F0E8]">
              Featured <span className="text-gradient">Finds</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="featured-prev"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F5F0E8] hover:border-[#F59E0B]/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="featured-next"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F5F0E8] hover:border-[#F59E0B]/30 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-2 text-[#F59E0B] text-sm font-semibold hover:gap-3 transition-all"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((product, i) => (
            <div key={product.id} className="w-56 shrink-0">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
