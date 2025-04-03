import axios from "axios";

export function getExcel(classNumber: number) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sheet/${classNumber}`, {
    responseType: "blob",
  });
}
