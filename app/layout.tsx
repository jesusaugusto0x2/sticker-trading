import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sticker-trading.vercel.app'),
  title: {
    default: 'Cromos Mundial 2026',
    template: '%s · Cromos Mundial 2026',
  },
  description:
    'Encuentra fans con los cromos que te faltan y ofrece tus repetidos. Intercambia fácil para completar tu álbum del Mundial 2026.',
  openGraph: {
    title: 'Cromos Mundial 2026',
    description:
      'Encuentra fans con los cromos que te faltan y ofrece tus repetidos. Intercambia fácil para completar tu álbum del Mundial 2026.',
    url: 'https://sticker-trading.vercel.app',
    siteName: 'Cromos Mundial 2026',
    locale: 'es_419',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
