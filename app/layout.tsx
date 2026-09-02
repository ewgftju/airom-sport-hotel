import type { Metadata } from "next";
import "@fontsource-variable/noto-sans/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIROM Sport Hotel — бюджетная гостиница в Атырау",
  description:
    "AIROM Sport Hotel в Атырау: номера от 14 000 ₸, размещение спортсменов и команд, трёхразовое питание и документы для организаций.",
  icons: {
    icon: "/sport/favicon.png",
    shortcut: "/sport/favicon.png",
    apple: "/sport/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
