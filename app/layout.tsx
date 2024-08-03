// app/layout.tsx or app/RootLayout.tsx (depending on your project structure)
import { PersistProvider } from "@/lib/Store/PersistProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Provider";
import QueryProviders from "./QueryProvider";
import "./globals.css";
import { StoreProvider } from "@/lib/Store/StoreProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hamu ai tools",
  description: "Best ai tools you ever seen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <StoreProvider>
            <QueryProviders>
              <Providers>{children}</Providers>
            </QueryProviders>
          </StoreProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
