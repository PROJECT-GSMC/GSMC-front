export const SCORE_CATEGORIES = {
  AWARD_IN: {
    value: "HUMANITIES-AWARD_CAREER-HUMANITY-IN_SCHOOL",
    message: "교내인성영역관련수상",
    field: "inAward",
    isCheckbox: false,
  },
  AWARD_OUT: {
    field: "outAward",
    value: "HUMANITIES-AWARD_CAREER-HUMANITY-OUT_SCHOOL",
    message: "교외인성영역관련수상",
    isCheckbox: false,
  },
  ACTIVITY: {
    value: "HUMANITIES-SERVICE-ACTIVITY",
    message: "봉사활동",
    field: "activity",
    isCheckbox: false,
  },
  SEMESTER_1: {
    value: "HUMANITIES-SERVICE-CLUB_SEMESTER_1",
    message: "1학기 봉사 시간",
    field: "oneSemester",
    isCheckbox: false,
  },
  SEMESTER_2: {
    value: "HUMANITIES-SERVICE-CLUB_SEMESTER_2",
    message: "2학기 봉사 시간",
    field: "twoSemester",
    isCheckbox: false,
  },
  NEWRROW: {
    value: "HUMANITIES-ACTIVITIES-NEWRROW_S",
    message: "뉴로우 참여 횟수",
    field: "newrrow",
    isCheckbox: false,
  },
  TOEIC: {
    value: "FOREIGN_LANG-ATTENDANCE-TOEIC_ACADEMY_STATUS",
    message: "TOEIC 사관 학교 참여 여부",
    field: "checkbox",
    isCheckbox: true,
  },
} as const;
