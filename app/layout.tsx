import type { Metadata } from "next";

import "./globals.css";
import dynamic from "next/dynamic";
const Provider = dynamic(() => import("@/components/Provider"));
import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-jersey-10",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yapster",
    description: "Yap it. meme it. pump it",
    applicationName: "Yapster",
    authors: [{ name: "Yapster", url: "https://yapster.fun" }],
    keywords: [
      "yapster",
      "yapping",
      "memes",
      "yapster.fun",
      "Crypto app",
      "memecoin",
      "meme coin app",
    ],
    openGraph: {
      title: "Yapster",
      description: "Yap it. meme it. pump it",
      url: "https://yapster.fun",
      siteName: "Yapster",
      images: [
        {
          url: "https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/image.svg",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: `https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/newimage.svg`,
        button: {
          title: "Start Yapping",
          action: {
            type: "launch_frame",
            name: "Yapster",
            url: `https://yapster.fun`,
            splashImageUrl: `https://pub-b8acacbdf4c34874a29a2fdaab996f29.r2.dev/tinylogo.svg`,
            splashBackgroundColor: "#000000",
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
      <body className={`${manrope.variable} font-manrope antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
