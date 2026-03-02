import pkg from "@pkg";
import { useScreenFlash } from "src/components/screen-flash/screen-flash-context";
import styles from "./settings-menu.module.css";

type SettingsMenuProps = {
  onClose: () => void;
};

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={styles.githubIcon}
    >
      {/* Pixel-art GitHub octocat silhouette */}
      <rect x="4" y="0" width="4" height="1" />
      <rect x="2" y="1" width="8" height="1" />
      <rect x="1" y="2" width="10" height="1" />
      <rect x="1" y="3" width="10" height="1" />
      <rect x="0" y="4" width="12" height="1" />
      <rect x="0" y="5" width="12" height="1" />
      <rect x="0" y="6" width="12" height="1" />
      <rect x="1" y="7" width="10" height="1" />
      <rect x="1" y="8" width="10" height="1" />
      <rect x="2" y="9" width="8" height="1" />
      {/* legs notch */}
      <rect x="2" y="10" width="3" height="1" />
      <rect x="7" y="10" width="3" height="1" />
      <rect x="2" y="11" width="2" height="1" />
      <rect x="8" y="11" width="2" height="1" />
    </svg>
  );
}

export function SettingsMenu({ onClose }: SettingsMenuProps) {
  const { flashEnabled, toggleFlash } = useScreenFlash();

  return (
    <div className={styles.backdrop}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <span className={styles.title}>
            <span className={styles.cursor} /> OPTIONS
          </span>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close settings"
          >
            [X]
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Preferences</div>
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Light Animations</span>
            <div className={styles.togglePair}>
              <button
                type="button"
                className={`${styles.toggleBtn} ${flashEnabled ? styles.toggleBtnActive : ""}`}
                onClick={() => !flashEnabled && toggleFlash()}
              >
                [ON]
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${!flashEnabled ? styles.toggleBtnActive : ""}`}
                onClick={() => flashEnabled && toggleFlash()}
              >
                [OFF]
              </button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Character</div>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => {}}
          >
            [LOAD CHARACTER]
          </button>
        </div>

        <div className={styles.footer}>
          <span className={styles.version}>v{pkg.version}</span>
          <a
            href="https://github.com/manuartero/dnd-beginner-character-sheet-5e-2024"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View source on GitHub"
          >
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
