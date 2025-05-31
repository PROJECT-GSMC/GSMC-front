export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(name + "=")) {
        return trimmedCookie.slice(name.length + 1);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return null;
};
