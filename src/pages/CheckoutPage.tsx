import { useState, Fragment, type ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import type { PaymentMethod, CheckoutAddress } from '../types';
import toast from 'react-hot-toast';

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string; desc: string }[] = [
  { id: 'gcash', label: 'GCash', icon: '💚', desc: 'Pay via GCash mobile wallet' },
  { id: 'maya', label: 'Maya', icon: '💜', desc: 'Pay via Maya (formerly PayMaya)' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
  { id: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard accepted' },
];

const PH_REGIONS = [
  'NCR (Metro Manila)', 'Region I (Ilocos)', 'Region II (Cagayan Valley)',
  'Region III (Central Luzon)', 'Region IV-A (CALABARZON)', 'Region IV-B (MIMAROPA)',
  'Region V (Bicol)', 'Region VI (Western Visayas)', 'Region VII (Central Visayas)',
  'Region VIII (Eastern Visayas)', 'Region IX (Zamboanga)', 'Region X (Northern Mindanao)',
  'Region XI (Davao)', 'Region XII (SOCCSKSARGEN)', 'Region XIII (Caraga)',
  'BARMM', 'CAR (Cordillera)', 'NIR',
];

export default function CheckoutPage() {
  const { state, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [payment, setPayment] = useState<PaymentMethod>('gcash');
  const [address, setAddress] = useState<CheckoutAddress>({
    firstName: '', lastName: '', phone: '', email: '',
    region: '', province: '', city: '', barangay: '', street: '', zipCode: '',
  });

  const shipping = totalPrice >= 999 ? 0 : 99;
  const total = totalPrice + shipping;

  const updateAddress = (field: keyof CheckoutAddress, val: string) =>
    setAddress((a) => ({ ...a, [field]: val }));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['firstName', 'lastName', 'phone', 'email', 'region', 'city', 'street'] as const;
    for (const key of required) {
      if (!address[key]) {
        toast.error(`Please fill in ${key}`, { style: { background: '#1E160E', color: '#F5F0E8', border: '1px solid #2E2116' } });
        return;
      }
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/order-confirmation');
  };

  if (state.items.length === 0 && step !== 3) {
    return (
      <div className="container-pad py-20 text-center">
        <p className="text-[#9E8E78] mb-4">No items in cart.</p>
        <Link to="/shop" className="btn-primary">Go to Shop</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container-pad py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-[#F5F0E8] mb-8">
          Checkout <span className="text-gradient">🇵🇭</span>
        </h1>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-10">
          {[
            { n: 1, label: 'Delivery' },
            { n: 2, label: 'Payment' },
            { n: 3, label: 'Review' },
          ].map(({ n, label }, i, arr) => (
            <Fragment key={n}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= n ? 'bg-[#F59E0B] text-[#0A0705]' : 'bg-[#1E160E] border border-[#2E2116] text-[#9E8E78]'
                }`}>{n}</div>
                <span className={`text-sm font-semibold hidden sm:block ${step >= n ? 'text-[#F5F0E8]' : 'text-[#9E8E78]'}`}>{label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-0.5 rounded transition-all ${step > n ? 'bg-[#F59E0B]' : 'bg-[#2E2116]'}`} />
              )}
            </Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form area */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleStep1}
                className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-6 space-y-5"
              >
                <h2 className="text-[#F5F0E8] font-bold text-lg">Delivery Address</h2>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name *" id="checkout-first-name">
                    <input
                      id="checkout-first-name"
                      type="text"
                      value={address.firstName}
                      onChange={(e) => updateAddress('firstName', e.target.value)}
                      className="field-input"
                      placeholder="Juan"
                    />
                  </FormField>
                  <FormField label="Last Name *" id="checkout-last-name">
                    <input
                      id="checkout-last-name"
                      type="text"
                      value={address.lastName}
                      onChange={(e) => updateAddress('lastName', e.target.value)}
                      className="field-input"
                      placeholder="dela Cruz"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Phone Number *" id="checkout-phone">
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={address.phone}
                      onChange={(e) => updateAddress('phone', e.target.value)}
                      className="field-input"
                      placeholder="+63 912 345 6789"
                    />
                  </FormField>
                  <FormField label="Email *" id="checkout-email">
                    <input
                      id="checkout-email"
                      type="email"
                      value={address.email}
                      onChange={(e) => updateAddress('email', e.target.value)}
                      className="field-input"
                      placeholder="juan@email.com"
                    />
                  </FormField>
                </div>

                <FormField label="Region *" id="checkout-region">
                  <select
                    id="checkout-region"
                    value={address.region}
                    onChange={(e) => updateAddress('region', e.target.value)}
                    className="field-input"
                  >
                    <option value="">Select region</option>
                    {PH_REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Province" id="checkout-province">
                    <input
                      id="checkout-province"
                      type="text"
                      value={address.province}
                      onChange={(e) => updateAddress('province', e.target.value)}
                      className="field-input"
                      placeholder="e.g. Rizal"
                    />
                  </FormField>
                  <FormField label="City / Municipality *" id="checkout-city">
                    <input
                      id="checkout-city"
                      type="text"
                      value={address.city}
                      onChange={(e) => updateAddress('city', e.target.value)}
                      className="field-input"
                      placeholder="e.g. Marikina"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Barangay" id="checkout-barangay">
                    <input
                      id="checkout-barangay"
                      type="text"
                      value={address.barangay}
                      onChange={(e) => updateAddress('barangay', e.target.value)}
                      className="field-input"
                      placeholder="e.g. Concepcion"
                    />
                  </FormField>
                  <FormField label="ZIP Code" id="checkout-zip">
                    <input
                      id="checkout-zip"
                      type="text"
                      value={address.zipCode}
                      onChange={(e) => updateAddress('zipCode', e.target.value)}
                      className="field-input"
                      placeholder="1800"
                    />
                  </FormField>
                </div>

                <FormField label="Street Address / Unit / Building *" id="checkout-street">
                  <input
                    id="checkout-street"
                    type="text"
                    value={address.street}
                    onChange={(e) => updateAddress('street', e.target.value)}
                    className="field-input"
                    placeholder="123 Rizal St., Unit 4B"
                  />
                </FormField>

                <button type="submit" id="checkout-step1-next" className="btn-primary w-full justify-center py-4">
                  Continue to Payment <ChevronRight className="w-5 h-5" />
                </button>
              </motion.form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-6"
              >
                <h2 className="text-[#F5F0E8] font-bold text-lg mb-5">Select Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      id={`payment-${opt.id}`}
                      onClick={() => setPayment(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                        payment === opt.id
                          ? 'border-[#F59E0B] bg-[#F59E0B]/10'
                          : 'border-[#2E2116] bg-[#1E160E] hover:border-[#F59E0B]/30'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <p className={`font-semibold ${payment === opt.id ? 'text-[#F59E0B]' : 'text-[#F5F0E8]'}`}>{opt.label}</p>
                        <p className="text-[#9E8E78] text-sm">{opt.desc}</p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        payment === opt.id ? 'border-[#F59E0B]' : 'border-[#2E2116]'
                      }`}>
                        {payment === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />}
                      </div>
                    </button>
                  ))}
                </div>

                {payment === 'card' && (
                  <div className="space-y-3 mb-5 p-4 bg-[#1E160E] rounded-xl border border-[#2E2116]">
                    <p className="text-[#9E8E78] text-sm font-semibold">Card Details (Demo)</p>
                    <input type="text" placeholder="Card Number" className="field-input" defaultValue="4242 4242 4242 4242" readOnly />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM/YY" className="field-input" defaultValue="12/28" readOnly />
                      <input type="text" placeholder="CVV" className="field-input" defaultValue="123" readOnly />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button id="checkout-step2-next" onClick={() => setStep(3)} className="btn-primary flex-1 justify-center">
                    Review Order <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* Delivery */}
                <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5">
                  <h3 className="text-[#F5F0E8] font-bold mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#F59E0B]" /> Delivery Address
                  </h3>
                  <p className="text-[#F5F0E8] font-semibold">{address.firstName} {address.lastName}</p>
                  <p className="text-[#9E8E78] text-sm">{address.phone} • {address.email}</p>
                  <p className="text-[#9E8E78] text-sm mt-1">{address.street}, {address.barangay}, {address.city}, {address.province}, {address.region} {address.zipCode}</p>
                </div>

                {/* Payment */}
                <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5">
                  <h3 className="text-[#F5F0E8] font-bold mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#F59E0B]" /> Payment Method
                  </h3>
                  <p className="text-[#F5F0E8]">
                    {PAYMENT_OPTIONS.find((o) => o.id === payment)?.icon}{' '}
                    {PAYMENT_OPTIONS.find((o) => o.id === payment)?.label}
                  </p>
                </div>

                {/* Items */}
                <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5">
                  <h3 className="text-[#F5F0E8] font-bold mb-4">Items ({state.items.length})</h3>
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg overflow-hidden shrink-0">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#F5F0E8] text-sm font-semibold">{item.product.name}</p>
                          <p className="text-[#9E8E78] text-xs">Size: {item.size} × {item.quantity}</p>
                        </div>
                        <p className="text-[#F59E0B] font-bold">₱{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline flex-1 justify-center">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    id="place-order-btn"
                    onClick={handlePlaceOrder}
                    className="btn-primary flex-1 justify-center text-base py-4"
                  >
                    <CheckCircle className="w-5 h-5" /> Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Summary sidebar */}
          <div>
            <div className="bg-[#150F0A] border border-[#2E2116] rounded-2xl p-5 sticky top-24">
              <h3 className="text-[#F5F0E8] font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                    <div className="relative w-10 h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#F59E0B] text-[#0A0705] text-[10px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F0E8] text-xs font-semibold truncate">{item.product.name}</p>
                      <p className="text-[#9E8E78] text-xs">Size: {item.size}</p>
                    </div>
                    <p className="text-[#F59E0B] text-sm font-bold shrink-0">₱{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2E2116] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9E8E78]">Subtotal</span>
                  <span className="text-[#F5F0E8]">₱{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9E8E78]">Shipping</span>
                  <span className={shipping === 0 ? 'text-[#22C55E]' : 'text-[#F5F0E8]'}>{shipping === 0 ? 'FREE' : `₱${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-[#2E2116]">
                  <span className="text-[#F5F0E8]">Total</span>
                  <span className="text-[#F59E0B] text-xl">₱{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%;
          background: #1E160E;
          border: 1px solid #2E2116;
          border-radius: 12px;
          padding: 10px 14px;
          color: #F5F0E8;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .field-input:focus {
          border-color: rgba(245, 158, 11, 0.5);
        }
        .field-input::placeholder {
          color: #9E8E78;
        }
        .field-input option {
          background: #1E160E;
        }
      `}</style>
    </main>
  );
}

function FormField({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#9E8E78] text-xs font-semibold uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
