import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ankieta",
  description: "Wypełnij krótką ankietę i pomóż nam rozwijać nasz projekt",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "Ankieta",
    description: "Wypełnij krótką ankietę i pomóż nam rozwijać nasz projekt",
    url: "https://szkolnyprzewodnik.edu.pl/ankieta",
    siteName: "Szkolny Przewodnik - Ankieta",
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
    title: "Ankieta",
    description: "Wypełnij krótką ankietę i pomóż nam rozwijać nasz projekt",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/ankieta",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
