import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/products';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="section-pad bg-[#0D0905]">
      <div className="container-pad">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#F5F0E8]">
            What Our <span className="text-gradient">Buyers Say</span>
          </h2>
        </div>

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="text-center">
            <p className="text-[#F59E0B] font-black text-5xl">4.8</p>
            <div className="flex gap-1 justify-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <p className="text-[#9E8E78] text-sm">from 2,000+ buyers</p>
          </div>
        </div>

        {/* Testimonial cards - Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5"
            >
              <Quote className="w-6 h-6 text-[#F59E0B]/40 mb-3" />
              <p className="text-[#F5F0E8] text-sm leading-relaxed mb-4">"{t.comment}"</p>
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#F59E0B]/30"
                />
                <div>
                  <p className="text-[#F5F0E8] font-semibold text-sm">{t.author}</p>
                  <p className="text-[#9E8E78] text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-6"
            >
              <Quote className="w-6 h-6 text-[#F59E0B]/40 mb-3" />
              <p className="text-[#F5F0E8] text-sm leading-relaxed mb-4">"{testimonials[current].comment}"</p>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].author}
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#F59E0B]/30"
                />
                <div>
                  <p className="text-[#F5F0E8] font-semibold text-sm">{testimonials[current].author}</p>
                  <p className="text-[#9E8E78] text-xs">{testimonials[current].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-4">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F59E0B]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} className="w-9 h-9 rounded-full bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F59E0B]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
