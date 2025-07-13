export interface Evidence {
  categoryName: string;
  file: File;
  acquisitionDate?: Date;
  value?: number;
  option: { send: string; name: string };
}
