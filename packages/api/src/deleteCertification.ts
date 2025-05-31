const instance = require("./axios");

const removeCertification = async (id: string | number) => {
  return instance.delete(`/certificates/current/${id}`);
};

module.exports = { removeCertification };
