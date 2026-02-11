import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <header style={{ padding: "16px", borderBottom: "1px solid #ddd" }}>
            <strong>ConceptToResume</strong>
            <nav style={{ marginTop: "8px" }}>
              <a href="/" style={{ marginRight: "12px" }}>Home</a>
              <a href="/select-sector" style={{ marginRight: "12px" }}>Create Resume</a>
              <a href="/templates" style={{ marginRight: "12px" }}>Templates</a>
              <a href="/login">Login</a>
            </nav>
          </header>

          <main style={{ padding: "24px" }}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
