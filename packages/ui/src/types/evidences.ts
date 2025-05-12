export interface Activity {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  status: postState;
  categoryName: string;
}

export interface Reading {
  id: number;
  title: string;
  author: string;
  page: number;
  content: string;
  status: postState;
}

export interface Others {
  id: number;
  fileUrl?: string;
  evidenceType: EvidenceType;
  status: postState;
  categoryName: string;
}

export type postState = "APPROVE" | "PENDING" | "REJECT";

export type post = Activity | Reading | Others;

export type EvidenceType =
  | "MAJOR"
  | "HUMANITIES"
  | "READING"
  | "FOREIGN_LANGUAGE"
  | "CERTIFICATE"
  | "TOPCIT"
  | "READ-A-THON"
  | "TOEIC"
  | "TOEFL"
  | "TEPS"
  | "TOEIC_SPEAKING"
  | "OPIC"
  | "JPT"
  | "CPT"
  | "HSK";

export type ACTIVITY_TYP = "MAJOR" | "HUMANITIES";
