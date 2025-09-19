export const metadata = {
  title: 'Brand Website Development PRD',
  description: 'Toritori — Next.js app',
};

import '../styles/globals.css';
import '../index.css';
import { Footer } from '@/components/Footer';
import NextHeader from '@/components/NextHeader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">
        <NextHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
