'use client';
import ProtectedRoute from "@/components/routes/ProtectedRoute";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ProtectedRoute>
            <main>{children}</main>
          </ProtectedRoute>
        </AppProvider>
      </body>
    </html>
  );
}
