import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/auth/Provider"

import "./globals.css";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siphon",
  description: "Make your Research invincible",
  icons: {
    icon: './favicon.ico', 
  
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const session = await getServerSession();
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
                {children}
        </SessionProvider>
    
      </body>
    </html>
  );
}
