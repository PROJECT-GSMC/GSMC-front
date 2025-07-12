export interface Option {
  name: string;
  send: string;
}

export interface FormValues {
  title: string;
  content: string;
  categoryName?: Option;
  file?: File;
  author?: string;
  page?: number;
  value?: number;
  draftId?: string;
}
