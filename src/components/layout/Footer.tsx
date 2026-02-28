import { Car, MapPin, Phone, Mail } from "lucide-react";

const FOOTER_LINKS = {
  Company:  ["About Us", "Careers", "Press", "Blog"],
  Services: ["Car Rentals", "Long-Term Hire", "Corporate", "Airport Transfers"],
  Support:  ["FAQ", "Contact Us", "Insurance", "Terms & Conditions"],
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Mel<span className="text-amber-400">Drive</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Melbourne&apos;s most trusted car rental. Quality vehicles,
              transparent pricing, and 24/7 roadside assistance.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Level 2, 390 Collins Street, Melbourne VIC 3000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+61396001234" className="hover:text-amber-400 transition-colors">
                  (03) 9600 1234
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:hello@meldrive.com.au" className="hover:text-amber-400 transition-colors">
                  hello@meldrive.com.au
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-amber-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} MelDrive Pty Ltd. All rights reserved. ABN 12 345 678 901</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((t) => (
              <a key={t} href="#" className="hover:text-amber-400 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
