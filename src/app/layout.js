import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web3Storage",
  description:
    "Web3Storage leads the way in Decentralized Data Sharing and Cloud storage, establishing a symbiotic ecosystem where everyone can participate and flourish.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
