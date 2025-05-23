import instance from "@repo/api/axios";
import { Certification } from "../model/certification";

export const getCertification = async (): Promise<Certification[]> => {
  return instance.get("/certificates/current");
};
