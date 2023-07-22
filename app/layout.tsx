import Head from "next/head";
import { Badge } from "../components/Badge";
import { Inter } from "next/font/google";
import { Providers } from "../components/providers";

import "./globals.css";
import { ReactNode, Suspense } from "react";
import clsx from "clsx";

interface RootLayoutProps {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });

//export default function RootLayout({ children }: RootLayoutProps)
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <Head>
            <title>Starter Kit</title>
            <link href="/favicon.svg" rel="icon" type="image/svg" />
          </Head>
          <Providers>
            {children}
            <Badge />
          </Providers>
        </body>
      </html>
    </>
  );
}
