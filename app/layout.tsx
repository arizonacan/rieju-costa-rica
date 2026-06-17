import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maximum Motorsports | Distribuidor Oficial Rieju",
  description: "El arma definitiva para el terreno latinoamericano. Potencia. Control. Pasión.",
  metadataBase: new URL("https://maximummotorsports.cr"), // CHANGE THIS TO THE REAL DOMAIN LATER
  openGraph: {
    title: "Maximum Motorsports | Rieju Costa Rica",
    description: "El arma definitiva para el terreno latinoamericano. Potencia. Control. Pasión.",
    url: "/",
    siteName: "Maximum Motorsports",
    images: [
      {
        url: "/assets/opengraph.jpg", // The 1200x630 image 
        width: 1200,
        height: 630,
        alt: "Maximum Motorsports Rieju Lineup",
      },
    ],
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maximum Motorsports | Rieju Costa Rica",
    description: "El arma definitiva para el terreno latinoamericano. Potencia. Control. Pasión.",
    images: ["/assets/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* WRAP THE APP HERE */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}