import { useScreenFlash } from "src/components/screen-flash/screen-flash-context";
import styles from "./top-menu.module.css";

type TopMenuProps = {
  title: string;
  showBack: boolean;
  onBack: () => void;
};

function FlashIcon() {
  return (
    <svg
      viewBox="0 0 7 7"
      width="12"
      height="12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={styles.pixelIcon}
    >
      {/* 4-pointed pixel star */}
      <rect x="3" y="0" width="1" height="1" />
      <rect x="2" y="1" width="3" height="1" />
      <rect x="1" y="2" width="5" height="1" />
      <rect x="0" y="3" width="7" height="1" />
      <rect x="1" y="4" width="5" height="1" />
      <rect x="2" y="5" width="3" height="1" />
      <rect x="3" y="6" width="1" height="1" />
    </svg>
  );
}

export function TopMenu({ title, showBack, onBack }: TopMenuProps) {
  const { flashEnabled, toggleFlash } = useScreenFlash();
  return (
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
          onClick={toggleFlash}
          className={`${styles.iconButton} ${flashEnabled ? styles.iconButtonActive : styles.iconButtonInactive}`}
          title={flashEnabled ? "Disable screen flash" : "Enable screen flash"}
        >
          <FlashIcon />
        </button>
      </div>
    </nav>
  );
}
