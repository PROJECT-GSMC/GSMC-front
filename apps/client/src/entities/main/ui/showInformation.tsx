import CountUp from "@repo/shared/countUp"

interface ShowInformationProps {
  name: string;
  score: number;
}

export const ShowInformation = ({ name, score }: ShowInformationProps) => {
  return (
    <div className="mb-8 sm:mb-[5.81rem] mx-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-[0.75rem] mb-4 sm:mb-[1.69rem] mt-8 sm:mt-[3.87rem]">
        <h3 className="text-body1s sm:text-titleMedium text-tropicalblue-700">
          {name}
        </h3>
        <span className="text-body1s sm:text-titleSmall">
          님의 인증제 점수는
        </span>
      </div>
      <div className="flex sm:flex-row items-start sm:items-center gap-2 sm:gap-[1.12rem]">
        <CountUp
          className="
            text-titleSmall px-4 py-2 rounded-full
            sm:text-titleLarge sm:px-[2.25rem] sm:py-[0.75rem] 
          text-tropicalblue-500 bg-gray-100"
          to={score}
        />
        <span className="text-body1s sm:text-titleSmall">입니다.</span>
      </div>
    </div>
  );
};
