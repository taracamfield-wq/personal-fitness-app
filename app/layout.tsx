import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness Dashboard",
  description: "Personal weekly fitness planning and trend tracking",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
