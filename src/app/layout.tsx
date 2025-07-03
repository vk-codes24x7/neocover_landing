import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/error-boundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "NeoCover – AI Resume Tailoring",
  description: "Instantly generate tailored resumes, cover letters, and interview prep using AI. Upload your resume, paste a job description, and get job-winning content in seconds.",
  keywords: ["AI resume", "cover letter generator", "job application", "resume tailoring", "interview prep", "career assistant", "AI job search"],
  authors: [{ name: "NeoCover Team" }],
  creator: "NeoCover",
  publisher: "NeoCover",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://neocover.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NeoCover – AI Resume Tailoring",
    description: "Instantly generate tailored resumes, cover letters, and interview prep using AI. Land more interviews with AI-powered job application assistance.",
    url: "https://neocover.ai",
    siteName: "NeoCover",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "NeoCover - AI Resume Tailoring Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoCover – AI Resume Tailoring",
    description: "Instantly generate tailored resumes, cover letters, and interview prep using AI.",
    images: ["/opengraph.png"],
    creator: "@neocover",
    site: "@neocover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            storageKey="neocover-theme"
          >
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
