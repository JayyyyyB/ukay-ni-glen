import { Shield, Leaf, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  {
    icon: Shield,
    title: 'Quality Checked',
    desc: 'Every item inspected & authenticated before listing',
    color: 'text-[#F59E0B]',
    bg: 'bg-[#F59E0B]/10',
    border: 'border-[#F59E0B]/20',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    desc: 'Sustainable fashion that helps the planet 🌿',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
  {
    icon: Truck,
    title: 'Ships Nationwide',
    desc: 'Free shipping on orders over ₱999 across PH',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '7-day return policy if item is not as described',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10',
    border: 'border-purple-400/20',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-[#0D0905] border-y border-[#2E2116]">
      <div className="container-pad">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col items-center text-center p-5 rounded-2xl border ${badge.bg} ${badge.border}`}
            >
              <div className={`w-12 h-12 rounded-xl ${badge.bg} ${badge.border} border flex items-center justify-center mb-3`}>
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
              </div>
              <h3 className={`font-bold text-sm mb-1.5 ${badge.color}`}>{badge.title}</h3>
              <p className="text-[#9E8E78] text-xs leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
