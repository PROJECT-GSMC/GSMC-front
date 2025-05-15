import { role } from "@repo/types/member";

export interface Member {
  email: string;
  name: string;
  grade: number;
  classNumber: number;
  number: number;
  totalScore: number;
  role: role;
}
