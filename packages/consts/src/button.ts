const variantStyles = {
  blue: {
    default: "bg-tropicalblue-500 text-white",
    active: "bg-[#1C2F8C] text-[#DBDCDE]",
    disabled: "bg-[#CDCDCF] text-[#828387] cursor-not-allowed",
  },
  skyblue: {
    default: "bg-inherit border border-tropicalblue-500 text-tropicalblue-500",
    active: "bg-[#DBDCDE] border border-tropicalblue-500 text-tropicalblue-500",
    disabled:
      "bg-white border border-[#828387] text-[#828387] cursor-not-allowed",
  },
  // 메인 페이지에서 사용할 예정
  skyblue_hover: {
    default:
      "bg-white border border-tropicalblue-500 text-tropicalblue-500 hover:bg-tropicalblue-500 hover:text-white ",
    active:
      "bg-[#DBDCDE] border border-tropicalblue-500 text-tropicalblue-500 hover:bg-tropicalblue-500 hover:text-white ",
    disabled:
      "bg-white border border-[#828387] text-[#828387] cursor-not-allowed",
  },
};

module.exports = { variantStyles };
