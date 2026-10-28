import "./globals.css";

export const metadata = {
  title: "Tuition Management System",
  description: "Simple Tuition Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}