export interface Evidence {
  categoryName: string;
  file: File;
  acquisitionDate?: string;
  option: { send: string; name: string };
}
