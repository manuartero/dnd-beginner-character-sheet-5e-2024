export function computeProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export function computeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function computeSkillModifier({
  abilityModifier,
  proficiencyBonus,
  isProficient,
}: {
  abilityModifier: number;
  proficiencyBonus: number;
  isProficient: boolean;
}): number {
  return abilityModifier + (isProficient ? proficiencyBonus : 0);
}
