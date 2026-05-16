import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://holansoft.com"),
  title: "HolanSoft | Sistema de gestion de inventario",
  description:
    "Landing page profesional de HolanSoft, un sistema moderno para inventario, ventas, compras, POS, usuarios y reportes.",
  openGraph: {
    title: "HolanSoft | Gestion inteligente de inventario",
    description:
      "Controla productos, ventas, compras, stock y reportes con una interfaz moderna para operaciones comerciales.",
    images: ["/holansoft/dashboard.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
