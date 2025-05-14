export interface Evidence {
  categoryName: string;
  file: File;
  acquisitionDate?: string;
  value?: number;
  option: { send: string; name: string };
}
