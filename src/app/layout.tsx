import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { PublicChrome } from "@/components/layout/PublicChrome";

// NOTE(fonts): temporarily using next/font/google (which self-hosts fonts at build
// time — no external <link> tag). Swap to next/font/local once .woff2 files land
// in /public/fonts/. See /public/fonts/README.md and CLAUDE.md rule #6.
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bruux.com"),
  title: {
    default: "BRUUX. | Collectif Créatif Gabonais",
    template: "%s | BRUUX.",
  },
  description:
    "BRUUX. — Entertainment company gabonaise. Événements, création de contenus, mannequinat et direction artistique. Libreville, Gabon.",
  keywords: [
    "BRUUX",
    "événements Libreville",
    "soirées Gabon",
    "collectif créatif Gabon",
    "BRUUX événements",
    "mannequinat Libreville",
    "entertainment Gabon",
    "Night Class",
    "Pool Party",
    "BRUXFAMILLY",
    "bruxsessionpick",
  ],
  authors: [{ name: "BRUUX." }],
  creator: "BRUUX.",
  publisher: "BRUUX.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bruux.com",
    siteName: "BRUUX.",
    title: "BRUUX. | Collectif Créatif Gabonais",
    description:
      "Plateforme dédiée à la création d'expériences, de contenus et d'événements à Libreville. Créativité. Événement. Famille.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRUUX. | Collectif Créatif Gabonais",
    description:
      "Entertainment company gabonaise. Événements, contenus, mannequinat.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bebasNeue.variable} ${inter.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
