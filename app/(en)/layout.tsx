import { RootShell, buildMetadata } from "@/components/RootShell";

export const metadata = buildMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
