"use client";

import clsx from "clsx";
import { ComponentProps } from "react";
import { signIn } from "next-auth/react";
import { users } from "../../data/users";
import { Button } from "../../primitives/Button";
import { Select } from "../../primitives/Select";

import styles from "./Authentication.module.css";

export function AuthenticationLayout({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={clsx(className, styles.container)} {...props}>
      <main className={styles.main}>
        <h2 className={styles.title}>Sign in to your account</h2>

        <DemoLogin />
      </main>
      <aside className={styles.aside} />
    </div>
  );
}

// === EVERYTHING BELOW ONLY NECESSARY FOR DEMO AUTH ===========================

function DemoLogin() {
  return (
    <div className={styles.actions}>
      <Select
        items={users.map((user) => ({ value: user.id, title: user.name }))}
        onChange={(email) => {
          signIn("credentials", { email });
        }}
        placeholder="Choose a profile…"
      />
    </div>
  );
}
