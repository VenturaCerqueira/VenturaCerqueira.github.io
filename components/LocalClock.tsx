"use client";

import { useEffect, useState } from "react";

// Horário atual em Salvador (America/Bahia), atualizado a cada 30s.
export function LocalClock({ locale }: { locale: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone: "America/Bahia", timeZoneName: "short" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [locale]);

  return <span className="font-mono tabular-nums">{time ?? "--:--"}</span>;
}
