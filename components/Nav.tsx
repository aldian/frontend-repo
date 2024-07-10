"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../app/AuthContext";
import { Button } from "@mui/material";
import styles from "../app/styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <nav className={styles.nav}>
      {user && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          className={styles.logoutButton} // Ensure this style is defined in your CSS
        >
          Logout
        </Button>
      )}
    </nav>
  );
};