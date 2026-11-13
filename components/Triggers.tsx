"use client";

// Botões leves que só disparam eventos. Ficam fora dos componentes pesados (mascote e terminal),
// para que o código deles não entre no carregamento inicial da página.

/** Abre o terminal (o código do terminal é baixado só nesse momento). */
export function TerminalTrigger({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("terminal:open"))} className={className}>
      {label}
    </button>
  );
}

/** Mostra/oculta o mascote. */
export function PetToggle({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("pet:toggle"))}
      className="underline decoration-dotted underline-offset-4 transition hover:text-accent">
      {label}
    </button>
  );
}
