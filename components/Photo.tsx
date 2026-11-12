import fs from "node:fs";
import path from "node:path";

// Server component: verifica no build se a foto existe em /public; senão, mostra iniciais.
export function hasPublicFile(src?: string) {
  return !!src && fs.existsSync(path.join(process.cwd(), "public", src));
}

export function Photo({ src, alt, initials, className = "" }: { src?: string; alt: string; initials: string; className?: string }) {
  if (hasPublicFile(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div className={`grid h-full w-full place-items-center bg-gradient-to-br from-accent to-accent-2 ${className}`} role="img" aria-label={alt}>
      <span className="text-7xl font-extrabold tracking-tight text-white/90">{initials}</span>
    </div>
  );
}
