import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';
import '@/app/global.css'; // Import global CSS once
import INavigation from '@/design-components/INavigation/INavigation';
import type { Metadata } from 'next'; // Ensure proper typing for Metadata

// Define Google Font
// const nunitoFont = Nunito({
//   subsets: ['latin'],
//   display: 'swap',
// });

// Define Local Fonts
// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

// Metadata for the application
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <header>
          <INavigation />
        </header>
        {children}
      </body>
    </html>
  );
}
