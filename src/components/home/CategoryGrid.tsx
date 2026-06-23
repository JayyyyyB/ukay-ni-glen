import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function CategoryGrid() {
  return (
    <section className="section-pad">
      <div className="container-pad">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-2">Browse by Category</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#F5F0E8]">
              What are you <span className="text-gradient">looking for?</span>
            </h2>
          </div>
          <Link
            to="/shop"
            id="categories-see-all"
            className="hidden md:flex items-center gap-2 text-[#F59E0B] text-sm font-semibold hover:gap-3 transition-all"
          >
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link
                to={`/shop?category=${cat.id}`}
                id={`category-${cat.id}`}
                className="block group relative overflow-hidden rounded-2xl aspect-square border border-[#2E2116] hover:border-[#F59E0B]/40 transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705]/90 via-[#0A0705]/30 to-transparent" />
                {/* Group hover overlay */}
                <div className="absolute inset-0 bg-[#F59E0B]/0 group-hover:bg-[#F59E0B]/10 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <p className="text-[#F5F0E8] font-bold text-sm leading-tight">{cat.name}</p>
                  <p className="text-[#9E8E78] text-xs mt-0.5">{cat.count} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile see all */}
        <div className="flex justify-center mt-6 md:hidden">
          <Link to="/shop" className="btn-outline text-sm">
            Browse All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
