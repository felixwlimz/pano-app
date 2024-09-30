import "./globals.css";
import { Navbar, Footer } from '@/components'
import { StateContext } from "@/context/StateContext";
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
 
export const metadata = {
  title: "Pano Store",
  description: "A Tech based store",
};

const inter = Inter({ 
  subsets : ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StateContext>
          <div className="layout">
            <Navbar />
            <main className="main-container">
              {children}
            </main>
            <Footer />
          </div>
        </StateContext>
      </body>
    </html>
  );
}
