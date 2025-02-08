import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "My App",
  description: "Description of my app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-montserrat antialiased`} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
