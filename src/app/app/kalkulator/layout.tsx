import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator",
  description: "Szybko i prosto oblicz punkty rekrutacyjne do szkoły średniej!",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "Kalkulator",
    description: "Szybko i prosto oblicz punkty rekrutacyjne do szkoły średniej!",
    url: "https://szkolnyprzewodnik.edu.pl/app/kalkulator",
    siteName: "Szkolny Przewodnik - Kalkulator",
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
    title: "Kalkulator",
    description: "Szybko i prosto oblicz punkty rekrutacyjne do szkoły średniej!",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/app/kalkulator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
