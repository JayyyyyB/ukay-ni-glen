import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&auto=format&fit=crop&q=80',
    tagline: '🔥 Bagong Arrivals',
    title: 'Thrift Smart,\nDress Amazing',
    subtitle: 'Premium ukay-ukay finds from Japan & Korea. Up to 90% off retail price!',
    cta: 'Shop Now',
    ctaLink: '/shop',
    badge: 'New Haul Every Week',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&auto=format&fit=crop&q=80',
    tagline: '💰 Super Tipid',
    title: 'Bundle Deals\nStarting ₱350',
    subtitle: 'Get 3 quality tops, 2 pairs of jeans, or 5 kids items at unbeatable prices!',
    cta: 'See Bundles',
    ctaLink: '/shop?tab=bundles',
    badge: 'Limited Stocks',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&auto=format&fit=crop&q=80',
    tagline: '✨ Authenticated',
    title: 'Real Brands,\nReal Savings',
    subtitle: 'Zara, H&M, Uniqlo, Levi\'s and more — all quality checked before shipping.',
    cta: 'Browse Collection',
    ctaLink: '/shop',
    badge: 'Quality Guaranteed',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0705]/90 via-[#0A0705]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container-pad h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              {slide.badge}
            </div>

            {/* Tagline */}
            <p className="text-[#9E8E78] text-sm font-semibold uppercase tracking-widest mb-3">
              {slide.tagline}
            </p>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black text-[#F5F0E8] leading-tight mb-4 whitespace-pre-line">
              {slide.title.split('\n')[0]}
              <br />
              <span className="text-gradient">{slide.title.split('\n')[1]}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#9E8E78] text-lg leading-relaxed mb-8 max-w-md">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to={slide.ctaLink} id={`hero-cta-${slide.id}`} className="btn-primary text-base px-8 py-3.5">
                {slide.cta} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-outline text-base px-8 py-3.5">
                Our Story
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stats strip */}
        <div className="flex gap-8 mt-12">
          {[
            { value: '856+', label: 'Items Available' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '2k+', label: 'Happy Buyers' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[#F59E0B] font-black text-xl">{stat.value}</p>
              <p className="text-[#9E8E78] text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <button
        id="hero-prev"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-[#F59E0B] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        id="hero-next"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-[#F59E0B] transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-[#F59E0B]' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
