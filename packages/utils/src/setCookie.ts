/* eslint-disable unicorn/no-document-cookie */
const setCookie = (name: string, value: string, days = 7): void => {
  if (typeof document === "undefined") return;

  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    (document as unknown as { cookie: string }).cookie =
      `${name}=${value};expires=${expires.toUTCString()};path=/`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { setCookie };
