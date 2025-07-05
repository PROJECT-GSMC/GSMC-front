export interface CertificationRequest {
  name: string;
  file: File;
  acquisitionDate: string;
}

export interface CertificationResponse {
  id: number;
  name: string;
  acquisitionDate: Date;
  evidenceUri: string;
}
