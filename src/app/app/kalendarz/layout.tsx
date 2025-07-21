import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalendarz",
  description: "Sprawdź dni wolne i zaplanuj swój rok szkolny perfekcyjnie już teraz!",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "Kalendarz",
    description: "Sprawdź dni wolne i zaplanuj swój rok szkolny perfekcyjnie już teraz!",
    url: "https://szkolnyprzewodnik.edu.pl/app/kalendarz",
    siteName: "Szkolny Przewodnik - Kalendarz",
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
    title: "Kalendarz",
    description: "Sprawdź dni wolne i zaplanuj swój rok szkolny perfekcyjnie już teraz!",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/app/kalendarz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
