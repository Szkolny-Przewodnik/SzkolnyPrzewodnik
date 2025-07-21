import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Doradztwo",
  description:
    "Wybierz za pomocą naszego narzędzia szkołę, która do ciebie pasuje.",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "Doradztwo",
    description:
      "Wybierz za pomocą naszego narzędzia szkołę, która do ciebie pasuje.",
    url: "https://szkolnyprzewodnik.edu.pl/app/doradztwo",
    siteName: "Szkolny Przewodnik - Doradztwo",
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
    title: "Doradztwo",
    description:
      "Wybierz za pomocą naszego narzędzia szkołę, która do ciebie pasuje.",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/app/doradztwo",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>
}
