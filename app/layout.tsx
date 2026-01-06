import type { Metadata } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Spice Haven - Authentic Indian Hotel & Restaurant | Mumbai",
  description: "Experience authentic Indian cuisine and hospitality at Spice Haven. Traditional recipes, warm ambiance, and comfortable accommodations in Mumbai.",
  keywords: ["Indian restaurant", "hotel Mumbai", "authentic Indian food", "biryani", "curry", "Indian cuisine"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
