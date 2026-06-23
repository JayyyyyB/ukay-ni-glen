import type { SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const Instagram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Youtube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2a29 29 0 0 0-.46 5.25 29 29 0 0 0 .46 5.33c.46 2.58 2.29 4.35 4.88 4.35H12c6.88 0 8.6-.46 8.6-.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0A0705] border-t border-[#2E2116] mt-20">
      <div className="container-pad py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#E11D48] flex items-center justify-center">
                <span className="text-white font-black text-sm">UK</span>
              </div>
              <div>
                <p className="font-black text-lg leading-none text-gradient">UkayFinds</p>
                <p className="text-[10px] text-[#9E8E78] leading-none tracking-widest uppercase">Philippines</p>
              </div>
            </div>
            <p className="text-[#9E8E78] text-sm leading-relaxed mb-6">
              Your trusted source for preloved fashion in the Philippines. Quality ukay-ukay items, authenticated and ready to ship. 🇵🇭
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', id: 'footer-instagram' },
                { icon: Facebook, href: '#', id: 'footer-facebook' },
                { icon: Youtube, href: '#', id: 'footer-youtube' },
              ].map(({ icon: Icon, href, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-[#1E160E] border border-[#2E2116] flex items-center justify-center text-[#9E8E78] hover:text-[#F59E0B] hover:border-[#F59E0B]/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[#F5F0E8] font-bold mb-4">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: "Women's", href: '/shop?category=women' },
                { label: "Men's", href: '/shop?category=men' },
                { label: 'Kids', href: '/shop?category=kids' },
                { label: 'Shoes', href: '/shop?category=shoes' },
                { label: 'Bags', href: '/shop?category=bags' },
                { label: 'Accessories', href: '/shop?category=accessories' },
                { label: 'Bundle Deals', href: '/shop?tab=bundles' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-[#9E8E78] text-sm hover:text-[#F59E0B] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[#F5F0E8] font-bold mb-4">Help</h4>
            <ul className="space-y-3">
              {[
                { label: 'How to Order', href: '/about' },
                { label: 'Shipping Info', href: '/about' },
                { label: 'Returns Policy', href: '/about' },
                { label: 'Size Guide', href: '/about' },
                { label: 'FAQ', href: '/about' },
                { label: 'About Us', href: '/about' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-[#9E8E78] text-sm hover:text-[#F59E0B] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5F0E8] font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F59E0B] mt-0.5 shrink-0" />
                <span className="text-[#9E8E78] text-sm">Metro Manila, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href="tel:+639123456789" className="text-[#9E8E78] text-sm hover:text-[#F59E0B] transition-colors">
                  +63 912 345 6789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href="mailto:hello@ukayfinds.ph" className="text-[#9E8E78] text-sm hover:text-[#F59E0B] transition-colors">
                  hello@ukayfinds.ph
                </a>
              </li>
            </ul>
            {/* Payment icons */}
            <div className="mt-6">
              <p className="text-[#9E8E78] text-xs mb-3">We accept:</p>
              <div className="flex gap-2 flex-wrap">
                {['GCash', 'Maya', 'COD', 'Card'].map((p) => (
                  <span key={p} className="text-xs bg-[#1E160E] border border-[#2E2116] text-[#9E8E78] px-2 py-1 rounded-lg">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2E2116] py-5">
        <div className="container-pad flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#9E8E78] text-sm">
            © 2025 UkayFinds Philippines. All rights reserved.
          </p>
          <p className="text-[#9E8E78] text-sm flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current" /> in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
