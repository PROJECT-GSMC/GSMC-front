export type GetCookieFunction = (name: string) => string | null;

export const getCookie: GetCookieFunction = (name) => {
  if (typeof document === "undefined") {
    return null;
  }

  try {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.startsWith(name + "=")) {
        const value = trimmedCookie.slice(name.length + 1);
        return value || null;
      }
    }
  } catch (error) {
    console.error("Error reading cookie:", error);
    return null;
  }

  return null;
};
