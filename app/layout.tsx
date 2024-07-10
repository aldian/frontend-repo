import type { ReactNode } from "react";
import { StoreProvider } from "../store/StoreProvider";
import { AuthProvider } from "./AuthContext";
import { Nav } from "../components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <AuthProvider>
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
      </AuthProvider>
    </StoreProvider>
  );
}