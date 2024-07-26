import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/providers";
import {ThemeToggle} from "@/app/ui/theme-toggle";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "MC Portals - Portal Linker",
    description: "Allows you to check if multiple pairs of Minecraft portals link to each other.",
    icons: "/icon/icon.png"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <Providers>
                <div className="flex flex-col justify-between min-h-dvh">
                    <header className="flex flex-row items-center justify-between border-b-4 border-b-card px-2">
                        <div className="flex flex-row items-center">
                            <Image src="/icon/icon.png" className="inline-block" width={36} height={36} alt="MC Portals - Portal Linker"/>
                            <span className="text-3xl font-bold px-4 py-2">MC Portals - Portal Linker</span>
                        </div>
                        <div className="flex flex-row items-center py-2 px-4">
                            <ThemeToggle/>
                        </div>
                    </header>
                    {children}
                    <footer className="py-2 px-4 mt-5 border-t-2 border-t-card flex flex-row items-center justify-center">
                        <p>&copy; 2024 by TreSet</p>
                    </footer>
                </div>
            </Providers>
            </body>
        </html>
    );
}
