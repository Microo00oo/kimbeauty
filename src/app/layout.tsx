import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Kim's House of Beauty | Luxury Hair Salon & Spa",
  description: "Bayonne's premier luxury salon. Experience master balayage, precision haircuts, hair Botox, and extensions with our elite stylists.",
  keywords: ["Hair Salon", "Bayonne Hair Salon", "Balayage", "Keratin Treatment", "Botox", "Hair Extensions", "Hair Color", "Haircuts", "Kim's House of Beauty"],
  authors: [{ name: "Kim's House of Beauty" }],
  openGraph: {
    title: "Kim's House of Beauty | Luxury Hair Salon",
    description: "Bayonne's premier luxury salon. Experience master balayage, precision haircuts, and extensions with our elite stylists.",
    url: "https://www.kimshouseofbeauty.com",
    siteName: "Kim's House of Beauty",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
