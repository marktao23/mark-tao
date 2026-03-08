import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";
import FooterSocials from "./components/FooterSocials";

export const metadata: Metadata = {
  title: "Mark Tao",
  description: "Welcome to my journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <Navbar />
          <main className="page-content">{children}</main>
          <FooterSocials />
        </div>
      </body>
    </html>
  );
}