import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Product Catalog',
  description: 'A Product Catalog Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Div principal para organizar tudo */}
        <div className="container mx-auto p-4"> {/* Ajustar a largura para dispositivos móveis */}
          {children}
        </div>
      </body>
    </html>
  );
}
