import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://octopus-mobi.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  title: 'Octopus mobi',
  description: 'Most trusted store for second-hand mobiles',
  openGraph: {
    title: '',
    description: 'Acme is a...',
    images: ['/next.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
