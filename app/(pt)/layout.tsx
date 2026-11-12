import { RootShell, buildMetadata } from "@/components/RootShell";

export const metadata = buildMetadata("pt");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="pt">{children}</RootShell>;
}
