// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Navbar from "./components/Navbar";
import { UserProvider } from '@/app/context/UserContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Luven",
  description: "Your beloved coffee and tea shop",
  image: "../../public/globe.svg",
  url: "https://luven.vercel.app",
  type: "website",
  keywords: ["coffee", "tea", "shop"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider> {/* Wrap the entire app with UserProvider */}
          <Header />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatBot />
        </UserProvider>
      </body>
    </html>
  );
}