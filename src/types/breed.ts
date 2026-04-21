export type AnimalType = "DOG" | "CAT" | "OTHER";

export type SizeCategory = "TINY" | "SMALL" | "MEDIUM" | "LARGE" | "GIANT";

export type BehaviorPattern = "HIDE" | "ROAM" | "RETURN";

export interface Breed {
  id: string;
  animalType: AnimalType;
  nameKo: string;
  nameEn?: string | null;
  sizeCategory: SizeCategory;
  baseSpeedKmh: number | null;
  behaviorPattern: BehaviorPattern;
  exploreFactor: number;
}
