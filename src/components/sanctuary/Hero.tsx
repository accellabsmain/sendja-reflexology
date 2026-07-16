export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6 pt-32 pb-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle ambient glow in the background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-primary"></div>
          <span className="text-accent-gold text-xs font-semibold tracking-[0.15em] uppercase">The Sanctuary</span>
          <div className="h-[1px] w-12 bg-primary"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif text-text-main leading-tight">
          Step into Twilight.<br/>Leave the Chaos Behind.
        </h1>
        
        <p className="text-lg text-text-mid max-w-xl mx-auto">
          Sendja is a premium sensory relaxation sanctuary designed to ground your body and clear your mind through the ancient art of reflexology and modern twilight atmosphere.
        </p>
      </div>
    </section>
  );
}
