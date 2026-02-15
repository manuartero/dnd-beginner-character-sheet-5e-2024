import c from "classnames";
import styles from "./retro-radio.module.css";

type RetroRadioOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

type RetroRadioProps<T extends string> = {
  options: RetroRadioOption<T>[];
  selected: T;
  name: string;
  onSelect: (value: T) => void;
};

export function RetroRadio<T extends string>({
  options,
  selected,
  name,
  onSelect,
}: RetroRadioProps<T>) {
  return (
    <fieldset className={styles.radioGroup}>
      {options.map((opt) => {
        const isSelected = opt.value === selected;
        return (
          <label
            key={opt.value}
            className={c(styles.option, isSelected && styles.optionSelected)}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => onSelect(opt.value)}
              className={styles.hiddenInput}
            />
            <span className={c(styles.box, isSelected && styles.boxChecked)} />
            <span className={styles.text}>
              <span className={styles.label}>{opt.label}</span>
              {opt.description && (
                <span className={styles.description}>{opt.description}</span>
              )}
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
