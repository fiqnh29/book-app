import { Geist_Mono, Outfit } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import { cn } from "@/lib/utils"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  metadataBase: new URL("https://fnh-bookfinder.vercel.app"),
  title: "BookFinder - Discover Your Next Read",
  description:
    "Search millions of books from Google Books, view detailed ratings, and manage your personal wishlist database in one premium app.",
  keywords: [
    "books",
    "search",
    "google books",
    "wishlist",
    "reading",
    "library",
  ],
  openGraph: {
    title: "BookFinder - Discover Your Next Read",
    description:
      "Search millions of books from Google Books, view detailed ratings, and manage your personal wishlist database in one premium app.",
    url: "https://fnh-bookfinder.vercel.app",
    siteName: "BookFinder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "BookFinder Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookFinder - Discover Your Next Read",
    description:
      "Search millions of books from Google Books, view detailed ratings, and manage your personal wishlist database in one premium app.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
}

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        outfit.variable
      )}
    >
      <body>
        <ThemeProvider>
          <NextTopLoader
            color="var(--color-primary)"
            crawl={true}
            easing="ease"
            height={4}
            showAtBottom={false}
            showSpinner={false}
          />
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
