import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nurul Hidayatul Hasanah | BI & Data Portfolio",
  description: "Personal portfolio of Nurul Hidayatul Hasanah — Information Systems student specializing in Business Intelligence, Data Analytics, Data Warehousing, ETL Pipelines, and Software Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}