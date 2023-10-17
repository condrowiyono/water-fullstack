import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import "@/utils/dayjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistem Informasi Hidrologi & Kualitas Air - Data Pos Curah Hujan",
  description: "Sistem Informasi Hidrologi & Kualitas Air - Data Pos Curah Hujan",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
