import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - AI Content Workspace",
  description: "Ai Content Workspace",
};

export default function DashboardPage() {
  return (
    Array.from({length : 100}).map((_, i) => (
      <div key={i}>Dashboard {i}</div>
    ))
  )
}
