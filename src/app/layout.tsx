import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AGROMASTER SERVICE | Reparații scule și utilaje de grădină",
  description:
    "Service și reparații pentru aparate de spălat cu presiune, drujbe, motocoase, generatoare, mașini de tuns iarba și scule electrice în București și Ilfov."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
