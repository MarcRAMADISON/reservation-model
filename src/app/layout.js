import { Geist, Geist_Mono, Lavishly_Yours } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lavishly_yours=Lavishly_Yours({
  variable: "--font-lavishly_yours",
  subsets: ["latin"],
  weight:'400'
})

export const metadata = {
  title: "Site de réservation",
  description: "Réserver vos places en ligne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lavishly_yours.variable}`}>
        {children}
      </body>
    </html>
  );
}
