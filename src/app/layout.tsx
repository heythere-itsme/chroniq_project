import { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Afacad, Bruno_Ace, Bowlby_One } from 'next/font/google';
import QueryProvider from './tanstackProvider';

const afacad = Afacad({
  subsets: ['latin'],
  variable: '--font-afacad',
  weight: ['400', '700'],
});
const brunoAce = Bruno_Ace({
  subsets: ['latin'],
  variable: '--font-bruno-ace',
  weight: ['400'],
});
const bowlbyOne = Bowlby_One({
  subsets: ['latin'],
  variable: '--font-bowlby-one',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'ChroniQ',
  description: 'Your Go to Task Management App',
  icons: {
    icon: '/favicon.svg',
  }
};
// Adding this comment for practice
// This change is for feature branch
// what happened

const RootLayout = ({children,} : {children: React.ReactNode}) => {

  return (
    <html lang="en" className="hydrated">
      <body className={`${afacad.variable} ${brunoAce.variable} ${bowlbyOne.variable}`}>
        <main>
          <QueryProvider>
          {children}
          </QueryProvider>
          </main>
        <Toaster richColors position='bottom-right' />
      </body>
    </html>
  )
}

export default RootLayout