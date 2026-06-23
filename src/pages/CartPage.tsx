import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { state, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const { items } = state;

  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <div className="container-pad py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 rounded-3xl bg-[#1E160E] flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-[#2E2116]" />
            </div>
            <h1 className="text-3xl font-black text-[#F5F0E8] mb-3">Your cart is empty</h1>
            <p className="text-[#9E8E78] mb-8">Looks like you haven't added anything yet. Let's change that!</p>
            <Link to="/shop" id="empty-cart-shop" className="btn-primary">
              <ShoppingBag className="w-5 h-5" /> Browse Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container-pad py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-[#F5F0E8]">My Cart <span className="text-gradient">({items.length})</span></h1>
          <button onClick={clearCart} className="text-[#9E8E78] text-sm hover:text-[#E11D48] transition-colors">
            Clear cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-5 bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5"
              >
                {/* Image */}
                <Link to={`/product/${item.product.id}`} className="shrink-0">
                  <div className="w-28 h-36 rounded-xl overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[#9E8E78] text-xs font-semibold uppercase">{item.product.brand}</p>
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-[#F5F0E8] font-semibold mt-0.5 hover:text-[#F59E0B] transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-[#9E8E78] text-sm mt-1">Size: <span className="text-[#F5F0E8] font-semibold">{item.size}</span></p>
                  <p className="text-[#F59E0B] font-black text-xl mt-2">
                    ₱{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-[#9E8E78] text-xs">₱{item.product.price.toLocaleString()} each</p>
                  )}

                  {/* Qty + Remove */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-2 bg-[#1E160E] border border-[#2E2116] rounded-xl px-3 py-2">
                      <button
                        id={`cart-page-minus-${item.product.id}`}
                        onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                        className="text-[#9E8E78] hover:text-[#F5F0E8] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-[#F5F0E8] font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        id={`cart-page-plus-${item.product.id}`}
                        onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                        className="text-[#9E8E78] hover:text-[#F5F0E8] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      id={`cart-page-remove-${item.product.id}`}
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-[#9E8E78] hover:text-[#E11D48] transition-colors flex items-center gap-1.5 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-6 sticky top-24">
              <h2 className="text-[#F5F0E8] font-bold text-lg mb-6">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9E8E78]">Subtotal ({items.length} items)</span>
                  <span className="text-[#F5F0E8]">₱{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9E8E78]">Shipping</span>
                  <span className={shipping === 0 ? 'text-[#22C55E] font-semibold' : 'text-[#F5F0E8]'}>
                    {shipping === 0 ? 'FREE' : `₱${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[#9E8E78] text-xs">
                    Add ₱{(999 - totalPrice).toLocaleString()} more for free shipping!
                  </p>
                )}
              </div>

              {/* Promo */}
              <div className="flex gap-2 mb-5">
                <div className="flex-1 flex items-center gap-2 bg-[#1E160E] border border-[#2E2116] rounded-xl px-3 py-2.5">
                  <Tag className="w-3.5 h-3.5 text-[#9E8E78]" />
                  <input
                    id="promo-input"
                    type="text"
                    placeholder="Promo code"
                    className="bg-transparent text-sm text-[#F5F0E8] placeholder-[#9E8E78] outline-none flex-1"
                  />
                </div>
                <button id="promo-apply" className="bg-[#1E160E] border border-[#2E2116] text-[#F59E0B] text-sm font-semibold px-4 rounded-xl hover:border-[#F59E0B]/30 transition-all">
                  Apply
                </button>
              </div>

              <div className="border-t border-[#2E2116] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#F5F0E8] font-bold text-lg">Total</span>
                  <span className="text-[#F59E0B] font-black text-2xl">₱{total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                id="cart-page-checkout"
                className="btn-primary w-full justify-center text-base"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>

              <Link to="/shop" className="btn-outline w-full justify-center text-sm mt-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
