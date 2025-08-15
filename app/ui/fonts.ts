import { Geist, Lato, Rufina } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const rufina = Rufina({
  subsets: ["latin"],
  weight: "700",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: "400",
});
