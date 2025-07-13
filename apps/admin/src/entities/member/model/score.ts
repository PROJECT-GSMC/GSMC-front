export interface ScoreResponse {
  totalScore: number;
  scores: Score[];
}

export interface Score {
  categoryName: string;
  value: number;
  convertedValue: number;
}
