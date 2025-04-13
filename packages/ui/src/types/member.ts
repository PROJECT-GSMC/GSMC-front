export interface Member {
  email: string;
  name: string;
  grade: number;
  classNumber: number;
  number: number;
  totalScore: number;
  role: role;
}

export type role =
  | "ROLE_STUDENT"
  | "ROLE_HOOMROOM_TEACHER"
  | "ROLE_MAISTER_TEACHER"
  | "ROLE_DEVELOPER";
