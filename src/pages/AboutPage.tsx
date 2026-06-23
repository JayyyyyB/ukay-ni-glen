import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, Star, Package } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&auto=format&fit=crop&q=80"
            alt="about hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0705]/95 via-[#0A0705]/80 to-[#0A0705]/60" />
        </div>
        <div className="relative z-10 container-pad">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-5xl md:text-6xl font-black text-[#F5F0E8] mb-6 leading-tight">
              Thrift with <br /><span className="text-gradient">Purpose</span>
            </h1>
            <p className="text-[#9E8E78] text-xl leading-relaxed mb-8">
              UkayFinds started as a passion project — a love for finding hidden gems in the piles of preloved fashion. Now we bring the ukay-ukay experience to your doorstep.
            </p>
            <Link to="/shop" className="btn-primary text-lg px-8 py-4">
              Shop Our Collection <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad">
        <div className="container-pad">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-3">Why Ukay-Ukay?</p>
              <h2 className="text-4xl font-black text-[#F5F0E8] mb-6">
                Sustainable Fashion for <span className="text-gradient">Every Filipino</span>
              </h2>
              <p className="text-[#9E8E78] leading-relaxed mb-6">
                The Philippines has a rich culture of ukay-ukay — a term for secondhand clothing that has become a beloved tradition. From Baguio markets to Divisoria stalls, Filipinos have always known how to find value in preloved fashion.
              </p>
              <p className="text-[#9E8E78] leading-relaxed mb-8">
                At UkayFinds, we digitize this experience. We source quality preloved items from Japan, Korea, and local collections — authenticate them, clean them, and bring them to you at fair prices. Masaya, sulit, at eco-friendly!
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '856+', label: 'Items Listed' },
                  { value: '2,000+', label: 'Happy Buyers' },
                  { value: '4.8★', label: 'Avg Rating' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-4 text-center">
                    <p className="text-[#F59E0B] font-black text-2xl">{stat.value}</p>
                    <p className="text-[#9E8E78] text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80"
                alt="fashion"
                className="rounded-3xl aspect-square object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80"
                alt="thrift"
                className="rounded-3xl aspect-square object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-[#0D0905]">
        <div className="container-pad">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#F5F0E8] mb-4">
              Our <span className="text-gradient">Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Sustainability',
                desc: 'Every preloved item we sell extends its life and reduces textile waste. Fashion that cares for the earth.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-400/10',
                border: 'border-emerald-400/20',
              },
              {
                icon: Heart,
                title: 'Community',
                desc: 'We empower Filipino resellers, buyers, and fashion lovers. Ukay-ukay is our culture — we celebrate it.',
                color: 'text-[#E11D48]',
                bg: 'bg-[#E11D48]/10',
                border: 'border-[#E11D48]/20',
              },
              {
                icon: Star,
                title: 'Quality',
                desc: 'Every item is inspected, cleaned, and accurately described. No surprises. What you see is what you get.',
                color: 'text-[#F59E0B]',
                bg: 'bg-[#F59E0B]/10',
                border: 'border-[#F59E0B]/20',
              },
              {
                icon: Package,
                title: 'Value',
                desc: 'Premium brands at a fraction of the cost. We make quality fashion accessible to every Juan.',
                color: 'text-blue-400',
                bg: 'bg-blue-400/10',
                border: 'border-blue-400/20',
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${v.bg} ${v.border}`}
              >
                <div className={`w-12 h-12 rounded-xl ${v.bg} ${v.border} border flex items-center justify-center mb-4`}>
                  <v.icon className={`w-6 h-6 ${v.color}`} />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${v.color}`}>{v.title}</h3>
                <p className="text-[#9E8E78] text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-pad max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-[#F5F0E8] mb-8 text-center">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do you verify the quality of items?',
                a: 'Every item goes through a 5-point inspection: general cleanliness, fabric integrity, zipper/button function, accurate sizing, and accurate brand labeling.',
              },
              {
                q: 'What does BNWT, Good, and Fair mean?',
                a: 'BNWT = Brand New With Tags (never worn, original tags attached). Good = Lightly used, minimal signs of wear. Fair = Noticeable wear but still functional and presentable.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Metro Manila: 1-3 days. Luzon: 3-5 days. Visayas & Mindanao: 5-7 days. We use J&T Express and LBC.',
              },
              {
                q: 'Can I return or exchange items?',
                a: 'Yes! We accept returns within 7 days if the item is significantly different from the description. Buyer pays for return shipping. Refunded via original payment method.',
              },
              {
                q: 'Do you accept GCash and COD?',
                a: 'Yes! We accept GCash, Maya (PayMaya), Cash on Delivery (COD), and Credit/Debit card payments.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5"
              >
                <h3 className="text-[#F5F0E8] font-semibold mb-2">{faq.q}</h3>
                <p className="text-[#9E8E78] text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#0D0905]">
        <div className="container-pad text-center">
          <h2 className="text-4xl font-black text-[#F5F0E8] mb-4">
            Ready to start <span className="text-gradient">thrifting?</span>
          </h2>
          <p className="text-[#9E8E78] text-lg mb-8">Browse hundreds of quality preloved items today.</p>
          <Link to="/shop" id="about-shop-cta" className="btn-primary text-lg px-10 py-4">
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
