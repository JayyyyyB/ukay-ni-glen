import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HeroBanner from '../components/home/HeroBanner';
import BundleDeals from '../components/home/BundleDeals';
import TrustBadges from '../components/home/TrustBadges';
import Testimonials from '../components/home/Testimonials';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      <HeroBanner />
      <TrustBadges />
      <CategoryGrid />
      <FeaturedProducts />
      <BundleDeals />

      {/* Newsletter / CTA Banner */}
      <section className="section-pad">
        <div className="container-pad">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1C1006] via-[#1E160E] to-[#150B06] border border-[#F59E0B]/20 p-10 md:p-16 text-center"
          >
            {/* Decorative glows */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                <Sparkles className="w-4 h-4" /> New haul every week
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-[#F5F0E8] mb-4">
                Ready to Find Your <br />
                <span className="text-gradient">Next Treasure?</span>
              </h2>
              <p className="text-[#9E8E78] text-lg mb-8 max-w-md mx-auto">
                Browse hundreds of quality preloved items. Authentic brands, incredible prices.
              </p>
              <Link to="/shop" id="home-shop-cta" className="btn-primary text-lg px-10 py-4">
                Shop All Items <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />
    </main>
  );
}
