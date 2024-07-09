import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";
import { AuthProvider } from "./AuthContext"; // Import the AuthProvider

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <AuthProvider>
      <StoreProvider>
        <html lang="en">
          <body>
            <section className={styles.container}>
              <Nav />
              <main className={styles.main}>{children}</main>

              <footer className={styles.footer}>
              </footer>
            </section>
          </body>
        </html>
      </StoreProvider>
    </AuthProvider>
  );
}