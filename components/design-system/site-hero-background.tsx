/**
 * Fixed top atmosphere (design system: ~500px band, fades into page).
 * Simplified from frontend.icodeit.com.au — breathing layers + dot texture.
 */
export function SiteHeroBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[500px] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-150 to-transparent dark:from-slate-800 dark:via-slate-900 dark:to-transparent"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 38%, transparent 100%)",
        }}
      />
      <div className="hero-breathe-layer-a absolute inset-0 opacity-40 dark:opacity-50" />
      <div className="hero-breathe-layer-b absolute inset-0 opacity-30 dark:opacity-45" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.45) 1px, transparent 0)`,
          backgroundSize: "18px 18px",
        }}
      />
    </div>
  );
}
