import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ibmPlexSansArabic = localFont({
  src: [
    {
      path: "./fonts/IBMPlexSansArabic-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Text.otf",
      weight: "450",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/IBMPlexSansArabic-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITunes Search App",
  description: "Search for podcasts and episodes using the ITunes API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSansArabic.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
