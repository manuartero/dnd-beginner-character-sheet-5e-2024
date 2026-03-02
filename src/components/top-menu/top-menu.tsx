import { useState } from "react";
import { createPortal } from "react-dom";
import { SettingsMenu } from "src/components/settings-menu/settings-menu";
import styles from "./top-menu.module.css";

type TopMenuProps = {
  title: string;
  showBack: boolean;
  onBack: () => void;
};

function GearIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={styles.pixelIcon}
    >
      {/* Teeth */}
      <rect x="6" y="0" width="2" height="2" />
      <rect x="6" y="12" width="2" height="2" />
      <rect x="0" y="6" width="2" height="2" />
      <rect x="12" y="6" width="2" height="2" />
      {/* Diagonal teeth */}
      <rect x="2" y="2" width="2" height="2" />
      <rect x="10" y="2" width="2" height="2" />
      <rect x="2" y="10" width="2" height="2" />
      <rect x="10" y="10" width="2" height="2" />
      {/* Outer ring */}
      <rect x="2" y="4" width="10" height="6" />
      <rect x="4" y="2" width="6" height="10" />
      {/* Center hole */}
      <rect x="5" y="5" width="4" height="4" fill="transparent" />
    </svg>
  );
}

export function TopMenu({ title, showBack, onBack }: TopMenuProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <nav className={styles.menu}>
        {showBack ? (
          <button type="button" onClick={onBack} className={styles.backButton}>
            &lt; Back
          </button>
        ) : (
          <span className={styles.spacer} />
        )}
        <span className={styles.title}>{title}</span>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => setIsSettingsOpen((v) => !v)}
            className={styles.iconButton}
            title="Options"
          >
            <GearIcon />
          </button>
        </div>
      </nav>
      {isSettingsOpen &&
        createPortal(
          <SettingsMenu onClose={() => setIsSettingsOpen(false)} />,
          document.body,
        )}
    </>
  );
}
