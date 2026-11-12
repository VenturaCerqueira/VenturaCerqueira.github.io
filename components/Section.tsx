export function Section({
  id, title, kicker, intro, alt, children,
}: { id: string; title: React.ReactNode; kicker?: string; intro?: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={alt ? "bg-bg-alt" : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="reveal mx-auto mb-12 max-w-2xl text-center">
          {kicker && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">{kicker}</p>}
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
