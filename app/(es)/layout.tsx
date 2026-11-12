import { RootShell, buildMetadata } from "@/components/RootShell";

export const metadata = buildMetadata("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
