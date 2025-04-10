import instance from "../../../../../../packages/ui/src/axios";

export const getCertification = async () => {
  return instance.get("/certificates/current");
};
