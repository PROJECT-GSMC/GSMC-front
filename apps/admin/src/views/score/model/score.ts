export interface Score {
  categoryName: string;
  value: number;
}

export interface ScoreFormType {
  activity: number | null;
  inAward: number | null;
  outAward: number | null;
  oneSemester: number | null;
  twoSemester: number | null;
  newrrow: number | null;
  checkbox: boolean | undefined;
}
