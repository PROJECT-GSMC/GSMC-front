export const categoryMapping: Record<string, string> = {
  "MAJOR-AWARD_CAREER-OUT_SCHOOL-OFFICIAL":
    "전공 영역-수상경력-교외-공문을 통한 전공분야 대회",
  "MAJOR-AWARD_CAREER-OUT_SCHOOL-UNOFFICIAL":
    "전공 영역-수상경력-교외-전공 분야 대회 개별 참여",
  "MAJOR-AWARD_CAREER-OUT_SCHOOL-HACKATHON":
    "전공 영역-수상경력-교외-연합 해커톤",
  "MAJOR-AWARD_CAREER-IN_SCHOOL-GSMFEST":
    "전공 영역-수상경력-교내-GSM Festival",
  "MAJOR-AWARD_CAREER-IN_SCHOOL-SCHOOL_HACKATHON":
    "전공 영역-수상경력-교내-교내해커톤",
  "MAJOR-AWARD_CAREER-IN_SCHOOL-PRESENTATION":
    "전공 영역-수상경력-교내-전공동아리 발표",
  "MAJOR-CERTIFICATE_NUM": "전공영역-자격증-자격증 취득 갯수",
  "MAJOR-TOPCIT_SCORE": "전공영역-TOPCIT-취득점수",
  "MAJOR-CLUB_ATTENDANCE_SEMESTER_1":
    "전공영역-동아리-전공(심화), 취업동아리 참여 실적 ※학기별 최대 2개까지 인정",
  "MAJOR-CLUB_ATTENDANCE_SEMESTER_2":
    "전공영역-동아리-전공(심화), 취업동아리 참여 실적 ※학기별 최대 2개까지 인정",
  "MAJOR-OUT_SCHOOL-ATTENDANCE_OFFICIAL_CONTEST":
    "전공영역-교외 대회 및 교육 참가-공문을 통한 전공분야 대회",
  "MAJOR-OUT_SCHOOL-ATTENDANCE_UNOFFICIAL_CONTEST":
    "전공영역-교외 대회 및 교육 참가-전공 분야 대회 개별 참여",
  "MAJOR-OUT_SCHOOL-ATTENDANCE_HACKATHON":
    "전공영역-교외 대회 및 교육 참가-연합 해커톤",
  "MAJOR-OUT_SCHOOL-ATTENDANCE_SEMINAR":
    "전공영역-교외 대회 및 교육 참가-전공 관련 교육프로그램(특강, 연수, 세미나)",
  "MAJOR-IN_SCHOOL-ATTENDANCE_GSMFEST":
    "전공영역-교내 대회 및 교육 참가-GSM Festival",
  "MAJOR-IN_SCHOOL-ATTENDANCE_HACKATHON":
    "전공영역-교내 대회 및 교육 참가-교내해커톤",
  "MAJOR-IN_SCHOOL-ATTENDANCE_CLUB-PRESENTATION":
    "전공영역-교내 대회 및 교육 참가-전공동아리 발표대",
  "MAJOR-IN_SCHOOL-ATTENDANCE_SEMINAR":
    "전공영역-교내 대회 및 교육 참가-전공특강(방과후)",
  "MAJOR-IN_SCHOOL-ATTENDANCE_AFTER-SCHOOL":
    "전공영역-교내 대회 및 교육 참가-전공 관련 방과 후 학교 이수",
  "HUMANITIES-AWARD_CAREER-HUMANITY-IN_SCHOOL":
    "인문/인성 영역-수상경력-인성영역관련 수상-교내",
  "HUMANITIES-AWARD_CAREER-HUMANITY-OUT_SCHOOL":
    "인문/인성 영역-수상경력-인성영역관련 수상-교외",
  "HUMANITIES-READING-READ_A_THON-TURTLE":
    "인문/인성 영역-독서활동-빛고을독서마라톤-거북이코스",
  "HUMANITIES-READING-READ_A_THON-CROCODILE":
    "인문/인성 영역-독서활동-빛고을독서마라톤-악어코스",
  "HUMANITIES-READING-READ_A_THON-RABBIT_OVER":
    "인문/인성 영역-독서활동-빛고을독서마라톤-토끼코스 이",
  "HUMANITIES-READING":
    "인문/인성 영역-독서활동-전공서적 및 일반서적-학교지정도서 권장",
  "HUMANITIES-SERVICE-ACTIVITY":
    "인문/인성 영역-봉사-봉사 활동(교육과정의 봉사활동 제외)",
  "HUMANITIES-SERVICE-CLUB_SEMESTER_1":
    "인문/인성 영역-봉사-봉사동아지(에너지 지킴이 등)",
  "HUMANITIES-SERVICE-CLUB_SEMESTER_2":
    "인문/인성 영역-봉사-봉사동아지(에너지 지킴이 등)",
  "HUMANITIES-CERTIFICATE-CHINESE_CHARACTER":
    "인문/인성 영역-자격증 취득-한자 자격증-4급 이상",
  "HUMANITIES-CERTIFICATE-KOREAN_HISTORY":
    "인문/인성 영역-자격증 취득-한국사 자격증-3급 이상",
  "HUMANITIES-ACTIVITIES-NEWRROW_S": "인문/인성 영역-뉴로우S-참여성실도",
  "HUMANITIES-ACTIVITIES-SELF-DIRECTED_ACTIVITIES":
    "인문/인성 영역-활동영역-다양한 체육활동 및 문화예술 활동, 취업 준비를 위한 자기주도적 활동",
  "FOREIGN_LANG-ATTENDANCE-TOEIC_ACADEMY_STATUS":
    "외국어 영역-토익 사관학교 참여-이수 여부",
  "FOREIGN_LANG-TOEIC_SCORE": "외국어 영역-외국어 공인 시험-TOEIC",
  "FOREIGN_LANG-TOEFL_SCORE": "외국어 영역-외국어 공인 시험-TOEFL",
  "FOREIGN_LANG-TEPS_SCORE": "외국어 영역-외국어 공인 시험-TEPS",
  "FOREIGN_LANG-TOEIC_SPEAKING_LEVEL":
    "외국어 영역-외국어 공인 시험-TOEIC Speaking",
  "FOREIGN_LANG-OPIC_SCORE": "외국어 영역-외국어 공인 시험-OPIc",
  "FOREIGN_LANG-JPT_SCORE": "외국어 영역-외국어 공인 시험-JPT",
  "FOREIGN_LANG-CPT_SCORE": "외국어 영역-외국어 공인 시험-CPT",
  "FOREIGN_LANG-HSK_SCORE": "외국어 영역-외국어 공인 시험-HSK",
};

export const getCategoryName = (categoryCode: string): string => {
  return categoryMapping[categoryCode] ?? categoryCode;
};
