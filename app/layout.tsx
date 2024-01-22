import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./contexts";
const inter = Inter({ subsets: ["latin"] });
import PrelineScript from "./components/PrelineScript";
import Script from "next/script";
export const metadata: Metadata = {
  title: "CSOL-AI",
  description:
    "Experience the future of seamless, intelligent communication with our AI-powered chat solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
          <PrelineScript />
        </AppProvider>
      </body>
      <Script src="../node_modules/preline/dist/preline.js"></Script>
    </html>
  );
}
