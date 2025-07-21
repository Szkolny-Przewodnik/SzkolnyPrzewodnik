import GoogleCaptchaWrapper from "@/components/auth/GoogleCaptchaWrapper"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Masz jakieś pytania lub potrzebujesz wsparcia? Jesteśmy tu, aby Ci pomóc!",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: "Kontakt",
    description: "Masz jakieś pytania lub potrzebujesz wsparcia? Jesteśmy tu, aby Ci pomóc!",
    url: "https://szkolnyprzewodnik.edu.pl/contact",
    siteName: "Szkolny Przewodnik - Kontakt",
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
    title: "Kontakt",
    description: "Masz jakieś pytania lub potrzebujesz wsparcia? Jesteśmy tu, aby Ci pomóc!",
    images: ["https://szkolnyprzewodnik.edu.pl/thumbnail.png"],
  },
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/contact",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <GoogleCaptchaWrapper>{children}</GoogleCaptchaWrapper>
}
