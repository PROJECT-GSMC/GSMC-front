export interface Score {
  categoryName: string;
  value: number;
}

export interface ScoreFormType {
  activity: number | null;
  oneSemester: number | null;
  twoSemester: number | null;
  newrrow: number | null;
  checkbox: boolean | undefined;
}
