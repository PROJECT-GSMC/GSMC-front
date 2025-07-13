export const extractStudentCode = (email: string): string | null => {
  const match = /^s(\d{5})@gsm\.hs\.kr$/.exec(email);
  return match && typeof match[1] === "string" ? match[1] : null;
};
