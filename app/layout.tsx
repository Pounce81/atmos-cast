import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atmos Cast",
  description: "A polished mobile-first weather dashboard powered by Open-Meteo."
};

export const viewport: Viewport = {
  themeColor: "#07111f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
