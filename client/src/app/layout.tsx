import type { Metadata } from "next";
import { SiteHeader } from "@/modules/catalog/components/site-header";
import "./globals.css";
export const metadata: Metadata = { title: "Common Ground — Considered goods", description: "A curated edit of fashion and everyday objects." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader />{children}<footer className="border-t border-[#EAE6DF] bg-white px-5 py-8 text-center text-xs text-[#74736e]">© 2026 Common Ground · Considered goods for everyday life.</footer></body></html>; }
