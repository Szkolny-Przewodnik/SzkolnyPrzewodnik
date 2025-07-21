import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nawigator",
  description: "Odkryj najlepsze szkoły w swoim powiecie i otwórz drzwi do nowych możliwości.",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "Nawigator",
    description: "Odkryj najlepsze szkoły w swoim powiecie i otwórz drzwi do nowych możliwości.",
    url: "https://szkolnyprzewodnik.edu.pl/app/nawigator",
    siteName: "Szkolny Przewodnik - Nawigator",
    images: [
      {
        url: "https://szkolnyprzewodnik.edu.pl/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Miniatura strony Szkolny Przewodnik",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nawigator",
    description: "Odkryj najlepsze szkoły w swoim powiecie i otwórz drzwi do nowych możliwości.",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/app/nawigator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
