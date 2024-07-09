import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { AuthProvider } from "./AuthContext";

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