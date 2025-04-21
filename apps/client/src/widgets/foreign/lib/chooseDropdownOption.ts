import { send } from "process";

export const chooseDropdownOption = (category: string) => {
  if (category === "OPIC") {
    return [
      { name: "Int 2 이상", send: 4 },
      { name: "Int 1", send: 3 },
      { name: "Int Low", send: 2 },
      { name: "Novice High", send: 1 },
    ];
  } else if (category === "TOEIC SPEAKING") {
    return [
      { name: "Level 6 이상", send: 6 },
      { name: "Level 5", send: 5 },
      { name: "Level 4", send: 4 },
      { name: "Level 3", send: 3 },
    ];
  } else {
    return [
      { name: "6급", send: 6 },
      { name: "5급", send: 5 },
      { name: "4급", send: 4 },
      { name: "3급", send: 3 },
      { name: "2급", send: 2 },
    ];
  }
};
