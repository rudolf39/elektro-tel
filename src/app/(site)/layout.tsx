import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elektro-Tel | Ihr Partner für Elektro und Telekommunikation",
  description: "Elektro-Tel - Ihr Experte für Elektroinstallationen und Telekommunikation in Winterthur, Tägerwilen und Schaffhausen. Professionell, zuverlässig und nah.",
  metadataBase: new URL('https://elektro-tel.ch'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Elektro-Tel | Ihr Partner für Elektro und Telekommunikation",
    description: "Ihr Experte für Elektroinstallationen und Telekommunikation in Winterthur, Tägerwilen und Schaffhausen.",
    url: 'https://elektro-tel.ch',
    siteName: 'Elektro-Tel AG',
    locale: 'de_CH',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col font-sans`}>
        <JsonLd />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
