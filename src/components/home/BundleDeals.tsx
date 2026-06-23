import { motion } from 'framer-motion';
import { Package, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bundleDeals } from '../../data/products';

export default function BundleDeals() {
  return (
    <section className="section-pad">
      <div className="container-pad">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Tag className="w-4 h-4" /> Bundle Deals
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#F5F0E8] mb-4">
            Mas Mura sa <span className="text-gradient">Bundle!</span>
          </h2>
          <p className="text-[#9E8E78] max-w-lg mx-auto">
            Save more when you buy in bundles. All items are quality-checked before packing. Mas sulit, mas masaya! 🎉
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundleDeals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="group relative rounded-3xl overflow-hidden border border-[#2E2116] bg-[#150F0A] card-hover h-full">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150F0A] via-[#150F0A]/40 to-transparent" />

                  {/* Item count badge */}
                  <div className="absolute top-4 left-4 bg-[#0A0705]/80 backdrop-blur-sm border border-[#2E2116] rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span className="text-[#F5F0E8] text-xs font-bold">{deal.itemCount} items</span>
                  </div>

                  {/* Savings badge */}
                  <div className="absolute top-4 right-4 bg-[#E11D48] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Save ₱{(deal.originalPrice - deal.price).toLocaleString()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[#F5F0E8] font-bold text-xl mb-2">{deal.title}</h3>
                  <p className="text-[#9E8E78] text-sm leading-relaxed mb-4">{deal.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {deal.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[#1E160E] border border-[#2E2116] text-[#9E8E78] px-2.5 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#F59E0B] font-black text-2xl">₱{deal.price.toLocaleString()}</span>
                      <span className="text-[#9E8E78] text-sm line-through ml-2">₱{deal.originalPrice.toLocaleString()}</span>
                    </div>
                    <Link
                      to="/shop?tab=bundles"
                      id={`bundle-${deal.id}`}
                      className="btn-accent text-sm px-5 py-2.5"
                    >
                      Get Deal <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
