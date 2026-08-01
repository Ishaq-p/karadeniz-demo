import "./globals.css";

export const metadata = {
  title: "Karadeniz Balık — QR Menü",
  description:
    "Karadeniz Balık Batıpark dijital QR menüsü. Balık, deniz mahsulleri, içecek ve tatlılar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
