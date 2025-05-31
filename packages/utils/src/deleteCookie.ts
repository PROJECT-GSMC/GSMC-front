/* eslint-disable unicorn/no-document-cookie */
const deleteCookie = (name: string) => {
  try {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  } catch (error) {
    console.error(error);
  }
  return null;
};

module.exports = { deleteCookie };
