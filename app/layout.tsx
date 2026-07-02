import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const raices = localFont({
  src: "../public/font/DonJose_Raices.otf",
  variable: "--font-raices",
  display: "swap",
});

const blur = localFont({
  src: "../public/font/Blur Bold.ttf",
  variable: "--font-blur",
  display: "swap",
});

const helveticaNow = localFont({
  src: "../public/font/helveticanowtext-bold-demo.ttf",
  variable: "--font-helvetica-now",
  display: "swap",
});

const montserrat = localFont({
  src: "../public/font/Montserrat-VariableFont_wght.ttf",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

const myriad = localFont({
  src: "../public/font/MyriadPro-Regular.otf",
  variable: "--font-myriad",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Random Trips — República Dominicana | Viaje 8 días por el Caribe",
  description:
    "Vive una experiencia de 8 días por República Dominicana con Random Trips. Puerto Plata, Samaná, Santo Domingo y el Sur profundo. Reserva tu cupo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${raices.variable} ${blur.variable} ${helveticaNow.variable} ${montserrat.variable} ${myriad.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
