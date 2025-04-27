import { SigninFormProps } from "../../../shared/model/AuthForm";

export const postSignin = async (form: SigninFormProps) => {
  try {
    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "로그인에 실패했습니다.");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
