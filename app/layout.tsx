import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Dog } from "@/components/dog";
import "./globals.css";

// Archivo has a width axis, so headings can be set condensed with font-stretch.
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://devkapil.in"),
  title: { default: "Kapil Dev · AI/ML Engineer", template: "%s · Kapil Dev" },
  description: "Kapil Dev, AI/ML engineer. LLM fine-tuning, document AI, data pipelines, MCP and agent systems.",
};

// Applies a saved light/dark choice before first paint, so the page doesn't flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Dog />
      </body>
    </html>
  );
}
