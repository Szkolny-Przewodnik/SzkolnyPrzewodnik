import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas",
  description: "Dowiedz się więcej o naszym zespole i naszej misji.",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "O nas",
    description: "Dowiedz się więcej o naszym zespole i naszej misji.",
    url: "https://szkolnyprzewodnik.edu.pl/about",
    siteName: "Szkolny Przewodnik - O nas",
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
    title: "O nas",
    description: "Dowiedz się więcej o naszym zespole i naszej misji.",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/about",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
