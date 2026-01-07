import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: "VRO System - कार्यालय उपविभागीय अधिकारी",
    description: "ग्राम महसूल अधिकारी दप्तर तपासणी आणि पूर्तता प्रणाली",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="mr" className={`${inter.variable} ${outfit.variable}`}>
            <body className="antialiased bg-slate-50 min-h-screen">
                <Sidebar />
                <main className="pl-72 min-h-screen">
                    <div className="p-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
