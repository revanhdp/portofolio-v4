import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revanza Hadi Putra — Software Engineer",
  description:
    "Software Engineer interested in building clean, useful products. Based in Indonesia.",
  openGraph: {
    title: "Revanza Hadi Putra — Software Engineer",
    description:
      "Software Engineer interested in building clean, useful products. Based in Indonesia.",
    url: "https://revanza.dev",
    siteName: "Revanza Hadi Putra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Revanza Hadi Putra — Software Engineer",
    description:
      "Software Engineer interested in building clean, useful products. Based in Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
