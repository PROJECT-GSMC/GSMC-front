interface ShowInformationProps {
  name: string;
  score: number;
}

export const ShowInformation = ({ name, score }: ShowInformationProps) => {
  return (
    <div className="mb-8 sm:mb-[5.81rem] mx-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-[0.75rem] mb-4 sm:mb-[1.69rem] mt-8 sm:mt-[3.87rem]">
        <h3 className="text-body2s sm:text-titleMedium text-tropicalblue-700">{name}</h3>
        <span className="text-body3s sm:text-titleSmall">님의 인증제 점수는</span>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-[1.12rem]">
        <h1 className="text-body1s sm:text-titleLarge px-4 sm:px-[2.25rem] py-2 sm:py-[0.75rem] text-tropicalblue-500 bg-gray-100 rounded-full">
          {score}점
        </h1>
        <span className="text-body3s sm:text-titleSmall">입니다.</span>
      </div>
    </div>
  );
};
