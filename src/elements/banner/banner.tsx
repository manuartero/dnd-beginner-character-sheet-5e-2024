import styles from "./banner.module.css";

import type { ReactNode } from "react";

type BannerProps = {
  icon?: ReactNode;
  children: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
};

export function Banner({
  icon,
  children,
  onDismiss,
  dismissLabel = "Dismiss",
}: BannerProps) {
  return (
    <output aria-live="polite" className={styles.root}>
      {icon && (
        <span aria-hidden className={styles.icon}>
          {icon}
        </span>
      )}
      <div className={styles.body}>{children}</div>
      {onDismiss && (
        <button
          type="button"
          className={styles.dismiss}
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          ✕
        </button>
      )}
    </output>
  );
}
