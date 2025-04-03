import axios from "axios";

export const getMembers = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/members/students`, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    // },
  });
};
