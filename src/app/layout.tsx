import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import "./animation.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Szkolny Przewodnik - Wspólnie budujemy przyszłość edukacji!",
    template: "Szkolny Przewodnik - %s",
  },
  description: "Szkolny Przewodnik to Twoje wsparcie i doradztwo w wyborze kariery. Znajdziesz tutaj inspiracje, porady i narzędzia dopasowane do Twoich potrzeb!",
  metadataBase: new URL("https://szkolnyprzewodnik.edu.pl/"),
  openGraph: {
    title: {
      default: "Szkolny Przewodnik - Wspólnie budujemy przyszłość edukacji!",
      template: "Szkolny Przewodnik - %s",
    },
    description: "Szkolny Przewodnik to Twoje wsparcie i doradztwo w wyborze kariery. Znajdziesz tutaj inspiracje, porady i narzędzia dopasowane do Twoich potrzeb!",
    url: "https://szkolnyprzewodnik.edu.pl/",
    siteName: "Szkolny Przewodnik",
    images: [
      {
        url: "/thumbnail.png",
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
    title: {
      default: "Szkolny Przewodnik - Wspólnie budujemy przyszłość edukacji!",
      template: "Szkolny Przewodnik - %s",
    },
    description: "Szkolny Przewodnik to Twoje wsparcie i doradztwo w wyborze kariery. Znajdziesz tutaj inspiracje, porady i narzędzia dopasowane do Twoich potrzeb!",
    images: ["/thumbnail.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://szkolnyprzewodnik.edu.pl/",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#1c1c3c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        {/* Google Tag Manager */}
        <GoogleTagManager gtmId={process.env.GTMID ?? ""} />
        <GoogleAnalytics gaId={process.env.GAID ?? ""} />
        {/* End Google Tag Manager */}
        {/* TikTok Pixel Code Start */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('` + process.env.TIKTOK_ANALYTICS + `');
              ttq.page();
            }(window, document, 'ttq');
          `
        }} />
        {/* TikTok Pixel Code End */}
      </head>
      <body>{children}</body>
    </html>
  );
}
