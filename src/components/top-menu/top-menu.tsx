import styles from "./top-menu.module.css";

type TopMenuProps = {
  title: string;
  showBack: boolean;
  onBack: () => void;
};

export function TopMenu({ title, showBack, onBack }: TopMenuProps) {
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
      <span className={styles.spacer} />
    </nav>
  );
}
