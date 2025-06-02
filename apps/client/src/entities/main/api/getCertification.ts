import instance from "@repo/api/axios";
import { Certification } from "../model/certification";

interface Certifications {
  data: {
    certificates: Certification[];
  };
}

export const getCertification = async (): Promise<Certifications> => {
  return instance.get("/certificates/current");
};
