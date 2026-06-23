import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationPage() {
  const orderNum = `UF-${Date.now().toString().slice(-6)}`;

  useEffect(() => {
    // Fire confetti
    const end = Date.now() + 2000;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F59E0B', '#E11D48', '#FCD34D'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F59E0B', '#E11D48', '#FCD34D'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <div className="container-pad max-w-lg text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F59E0B] to-[#E11D48] flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-[#F59E0B] text-sm font-semibold uppercase tracking-widest mb-3">Order Confirmed!</p>
          <h1 className="text-4xl font-black text-[#F5F0E8] mb-4">
            Salamat sa iyong <span className="text-gradient">order!</span> 🎉
          </h1>
          <p className="text-[#9E8E78] text-lg mb-6 leading-relaxed">
            Your order has been placed successfully. We'll start preparing your ukay-ukay finds right away!
          </p>

          {/* Order number */}
          <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5 mb-6 inline-block">
            <p className="text-[#9E8E78] text-xs uppercase tracking-wider mb-1">Order Number</p>
            <p className="text-[#F59E0B] font-black text-2xl">{orderNum}</p>
          </div>

          {/* Timeline */}
          <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-6 mb-8 text-left">
            <h3 className="text-[#F5F0E8] font-bold mb-4">What happens next?</h3>
            <div className="space-y-4">
              {[
                { icon: '✅', step: 'Order confirmed', time: 'Now', active: true },
                { icon: '📦', step: 'Packing your items', time: '1-2 days', active: false },
                { icon: '🚚', step: 'Shipped via J&T / LBC', time: '2-5 days', active: false },
                { icon: '🏠', step: 'Delivered to your door', time: '3-7 days total', active: false },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-3">
                  <span className="text-lg">{s.icon}</span>
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${s.active ? 'text-[#F59E0B]' : 'text-[#F5F0E8]'}`}>{s.step}</p>
                    <p className="text-[#9E8E78] text-xs">{s.time}</p>
                  </div>
                  {s.active && (
                    <span className="text-xs bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] font-semibold px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" id="order-conf-shop" className="btn-primary">
              <ShoppingBag className="w-5 h-5" /> Continue Shopping
            </Link>
            <Link to="/" className="btn-outline">
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
