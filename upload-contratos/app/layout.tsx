import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cade Consig",
  description: "Gestão de Contratos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
