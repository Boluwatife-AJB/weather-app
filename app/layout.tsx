import type { Metadata } from 'next';
import { Assistant } from 'next/font/google';
import './globals.css';



const assistant = Assistant({
  variable: '--font-assistant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});



export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A weather app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${assistant.className} bg-[#c9d1d3]`}>{children}</body>
    </html>
  );
}
