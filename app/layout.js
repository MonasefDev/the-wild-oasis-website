import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Navigation from "./_components/Navigation";
import Header from "./_components/Header";

const Josifin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s - The Wild Oasis",
    default: "welcom to The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Josifin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-4">
          <main className="max-w-7xl mx-auto p-12 ">{children}</main>
        </div>
      </body>
    </html>
  );
}
