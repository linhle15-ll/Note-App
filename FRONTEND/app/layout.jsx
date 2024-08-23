import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Poppins } from "next/font/google"

import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins"
});

export const metadata = {
  title: "Notie",
  description: "Let Notie be for Note Bestie",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable}`}>
          <div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}