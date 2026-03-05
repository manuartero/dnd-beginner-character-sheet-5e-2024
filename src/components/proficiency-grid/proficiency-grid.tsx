import c from "classnames";
import { Section } from "elements";
import proficiencyDetailsData from "src/data/proficiency-details.json";
import {
  getProficiencyRestriction,
  hasProficiency,
  type ProficiencyKey,
  type ProficiencySet,
} from "src/models/classes";
import { resolveIconPath } from "src/models/icons";
import styles from "./proficiency-grid.module.css";

type ProficiencyGridProps = {
  proficiencies: ProficiencySet;
};

type ProficiencyDetails = {
  label: string;
  icon: string;
};

const PROFICIENCY_DETAILS = proficiencyDetailsData as Record<
  ProficiencyKey,
  ProficiencyDetails
>;

const ARMOR_ROW: ProficiencyKey[] = [
  "light-armor",
  "medium-armor",
  "heavy-armor",
];

const WEAPON_ROW: ProficiencyKey[] = [
  "simple-weapons",
  "martial-weapons",
  "shields",
];

function ProficiencyCell({
  proficiencyKey,
  proficiencies,
}: {
  proficiencyKey: ProficiencyKey;
  proficiencies: ProficiencySet;
}) {
  const enabled = hasProficiency(proficiencies, proficiencyKey);
  const restriction = getProficiencyRestriction(proficiencies, proficiencyKey);
  const details = PROFICIENCY_DETAILS[proficiencyKey];

  return (
    <div className={c(styles.cell, !enabled && styles.cellDisabled)}>
      <img
        src={resolveIconPath(details.icon)}
        alt={details.label}
        className={styles.icon}
      />
      <span className={styles.label}>
        {details.label}
        {restriction && <span className={styles.asterisk}> *</span>}
      </span>
    </div>
  );
}

function collectFootnotes(
  keys: ProficiencyKey[],
  proficiencies: ProficiencySet,
): string[] {
  const footnotes: string[] = [];
  for (const key of keys) {
    const restriction = getProficiencyRestriction(proficiencies, key);
    if (restriction) {
      const label = PROFICIENCY_DETAILS[key].label;
      footnotes.push(`* ${label}: ${restriction.join(", ")} only`);
    }
  }
  return footnotes;
}

export function ProficiencyGrid({ proficiencies }: ProficiencyGridProps) {
  const allKeys = [...ARMOR_ROW, ...WEAPON_ROW];
  const footnotes = collectFootnotes(allKeys, proficiencies);

  return (
    <Section title="Weapon Proficiencies">
      <div className={styles.grid}>
        <div className={styles.row}>
          {ARMOR_ROW.map((key) => (
            <ProficiencyCell
              key={key}
              proficiencyKey={key}
              proficiencies={proficiencies}
            />
          ))}
        </div>
        <div className={styles.row}>
          {WEAPON_ROW.map((key) => (
            <ProficiencyCell
              key={key}
              proficiencyKey={key}
              proficiencies={proficiencies}
            />
          ))}
        </div>
        {footnotes.length > 0 && (
          <div className={styles.footnotes}>
            {footnotes.map((note) => (
              <p key={note} className={styles.footnote}>
                {note}
              </p>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
