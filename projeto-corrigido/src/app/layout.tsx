import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Análise de Consumo Diesel",
  description: "Consolidação de consumo de diesel por embarcação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
