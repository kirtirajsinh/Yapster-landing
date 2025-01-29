import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const Provider = dynamic(() => import("@/components/Provider"));

const appUrl =
  process.env.NODE_ENV === "production"
    ? "https://yapster.fun"
    : "https://msi-1.tail6cd562.ts.net";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yapster",
    description: "Yap it. meme it. pump it",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/image.svg`,
        button: {
          title: "Start Yapping",
          action: {
            type: "launch_frame",
            name: "Yapster",
            url: `${appUrl}/`,
            splashImageUrl: `https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/icon.svg`,
            splashBackgroundColor: "#131313",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
