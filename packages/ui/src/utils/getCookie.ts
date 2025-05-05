export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  try {
    const cookies =
      (document as unknown as { cookie: string }).cookie?.split(";") || [];
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]?.trim();
      if (cookie?.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
