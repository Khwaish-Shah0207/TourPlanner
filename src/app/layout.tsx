import "./globals.css";

export const metadata = {
  title: "Tour Planner",
  description: "Plan tasks for your trips on a calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
