export interface Activity {
  id: number;
  title: string;
  content: string;
  imageUri?: string;
  categoryName: string;
  status: PostStatus;
}

export interface Reading {
  id: number;
  title: string;
  content: string;
  author: string;
  page: number;
  status: PostStatus;
}

export interface Others {
  id: number;
  evidenceType: EvidenceType;
  fileUri: string;
  categoryName: string;
  status: PostStatus;
}

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

export type PostStatus = "PENDING" | "APPROVE" | "REJECT";

export type Post = Activity | Reading | Others;

export interface EvidenceResponse {
  majorActivityEvidence: Activity[];
  humanitiesActivityEvidence: Activity[];
  readingEvidence: Reading[];
  otherEvidence: Others[];
}
