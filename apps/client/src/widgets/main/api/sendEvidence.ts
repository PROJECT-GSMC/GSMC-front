import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

interface EvidenceProps {
  categoryName: string;
  file: File;
}

export const sendEvidence = async (data: EvidenceProps) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("categoryName", data.categoryName);
    return await instance.post("/evidence/current/other", formData);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "기타증빙자료 등록 실패";
    }
    throw error;
  }
};
