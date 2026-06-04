import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Importamos el nuevo componente

// Le decimos a Next.js que use la red global rápida de Cloudflare
export const runtime = 'edge';

export const metadata: Metadata = {
  title: "MIRES | Ministerio Restauración",
  description: "Su gracia escribe nuevas historias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        
        {/* Flex-grow empuja el footer hacia abajo si hay poco contenido */}
        <main className="flex-grow">
          {children}
        </main>

        <Footer /> {/* Inyectamos el pie de página */}
      </body>
    </html>
  );
}