import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQty, totalPrice } = useCart();
  const { items, isOpen } = state;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0705] border-l border-[#2E2116] z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2E2116]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
                <h2 className="font-bold text-[#F5F0E8] text-lg">My Cart</h2>
                {items.length > 0 && (
                  <span className="bg-[#F59E0B] text-[#0A0705] text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                id="cart-close"
                onClick={closeCart}
                className="w-9 h-9 rounded-xl bg-[#1E160E] flex items-center justify-center text-[#9E8E78] hover:text-[#F5F0E8] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#1E160E] flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-[#2E2116]" />
                  </div>
                  <div>
                    <p className="text-[#F5F0E8] font-semibold mb-1">Your cart is empty</p>
                    <p className="text-[#9E8E78] text-sm">Start browsing our ukay-ukay finds!</p>
                  </div>
                  <button onClick={closeCart} className="btn-primary">
                    Browse Shop
                  </button>
                </div>
              ) : (
                <div className="px-4 space-y-3">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 bg-[#150F0A] rounded-2xl p-3 border border-[#2E2116]"
                    >
                      {/* Image */}
                      <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[#9E8E78] text-xs font-semibold uppercase">{item.product.brand}</p>
                        <p className="text-[#F5F0E8] text-sm font-semibold leading-snug mt-0.5 line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-[#9E8E78] text-xs mt-1">Size: {item.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[#F59E0B] font-bold text-sm">
                            ₱{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          {/* Qty controls */}
                          <div className="flex items-center gap-2">
                            <button
                              id={`cart-minus-${item.product.id}`}
                              onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F5F0E8] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-[#F5F0E8] font-bold text-sm w-4 text-center">{item.quantity}</span>
                            <button
                              id={`cart-plus-${item.product.id}`}
                              onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F5F0E8] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              id={`cart-remove-${item.product.id}`}
                              onClick={() => removeItem(item.product.id, item.size)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[#9E8E78] hover:text-[#E11D48] transition-colors ml-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#2E2116] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#9E8E78] text-sm">Subtotal</p>
                    <p className="text-[#F5F0E8] text-xs mt-0.5">Shipping calculated at checkout</p>
                  </div>
                  <p className="text-[#F59E0B] font-black text-2xl">₱{totalPrice.toLocaleString()}</p>
                </div>
                <Link
                  to="/checkout"
                  id="cart-checkout-btn"
                  onClick={closeCart}
                  className="btn-primary w-full justify-center"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="btn-outline w-full justify-center text-sm"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
