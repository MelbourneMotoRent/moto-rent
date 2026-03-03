import { Shield, Clock, MapPin, CreditCard, Headphones, Star } from "lucide-react";

const FEATURES = [
  { Icon: Clock,       title: "Instant Booking",         desc: "Reserve your car in under 2 minutes. No lengthy forms.",                  color: "bg-blue-600" },
  { Icon: Shield,      title: "Free Cancellation",       desc: "Cancel up to 24 hours before pickup at zero cost.",                       color: "bg-green-500" },
  { Icon: MapPin,      title: "70+ Melbourne Locations", desc: "Pick up from the airport, CBD, or any suburb across Melbourne.",          color: "bg-blue-500" },
  { Icon: CreditCard,  title: "No Hidden Fees",          desc: "The price you see is exactly what you pay. All taxes included.",          color: "bg-green-600" },
  { Icon: Headphones,  title: "24/7 Roadside Assist",    desc: "Breakdown support available any time, day or night.",                     color: "bg-blue-700" },
  { Icon: Star,        title: "Top-Rated Fleet",         desc: "Every car professionally cleaned and inspected before your trip.",        color: "bg-green-400" },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-green-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            Why Choose GlideGo
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-5">
            Driving Made Simple
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            We&apos;ve removed every friction point so you can focus on the drive.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ Icon, title, desc, color }) => (
            <div
              key={title}
              className="group relative bg-white/5 hover:bg-white/8 border border-white/10 hover:border-blue-400/30 rounded-2xl p-6 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
