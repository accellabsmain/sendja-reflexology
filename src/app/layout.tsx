import type { Metadata } from "next";
import { Marcellus, Manrope } from "next/font/google";
import "./globals.css";
import { PitchPresenter } from "@/components/demo/PitchPresenter";

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Sendja Reflexology | Premium Sanctuary",
  description: "Experience the ultimate relaxation and sensory journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${marcellus.variable} ${manrope.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PitchPresenter />
      </body>
    </html>
  );
}
