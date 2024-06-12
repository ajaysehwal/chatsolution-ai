import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { AppProvider } from "../../contexts";
import MobileNav from "@/components/AppComponents/MobileNav";
import Sidebar from "@/components/AppComponents/sidebar";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "COS AI",
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
        <div className="relative h-screen w-full lg:ps-64">
          <div className="py-10 lg:py-14">
            <MobileNav />
            <Sidebar />
            <AppProvider>{children}</AppProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
