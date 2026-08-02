import type { Metadata } from "next";
import "./globals.css";
import AuthWrapper from "@/components/layout/AuthWrapper";

export const metadata: Metadata = {
  title: "Palomares Beauty — Analytics",
  description: "Plataforma de gestão clínica e operacional premium para Palomares Beauty",
  keywords: ["clínica", "gestão", "analytics", "dashboard", "palomares beauty"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="flex h-screen overflow-hidden" style={{ background: "#0a0a0f" }}>
          <AuthWrapper>{children}</AuthWrapper>
        </div>
      </body>
    </html>
  );
}
