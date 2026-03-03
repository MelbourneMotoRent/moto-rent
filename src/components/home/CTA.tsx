export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #16a34a 100%)" }}>
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-400/30 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
          Ready to hit the road?
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          Your Next Adventure
          <br />
          Starts Right Here
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join 50,000+ happy customers. Book in 2 minutes — free cancellation,
          no hidden fees, instant confirmation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#fleet"
            className="px-8 py-4 bg-white text-blue-700 font-black rounded-2xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg"
          >
            Browse Our Fleet →
          </a>
          <a
            href="tel:+61396001234"
            className="px-8 py-4 border-2 border-white/40 text-white hover:bg-white/10 font-bold rounded-2xl transition-all text-lg"
          >
            📞 (03) 9600 1234
          </a>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 mt-14 pt-10 border-t border-white/20">
          {[
            "Free Cancellation",
            "No Credit Card Surcharge",
            "Roadside Assistance Included",
            "Clean & Inspected",
          ].map((t) => (
            <div key={t} className="flex items-center gap-2 text-white/90 text-sm font-semibold">
              <span className="text-green-300 text-base">✓</span> {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
