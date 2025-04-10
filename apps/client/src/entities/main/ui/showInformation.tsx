interface ShowInformationProps {
  name: string;
  score: number;
}

export const ShowInformation = ({ name, score }: ShowInformationProps) => {
  return (
    <div className="mb-[5.81rem]">
      <div className="flex items-center gap-[0.75rem] mb-[1.69rem] mt-[3.87rem]">
        <h3 className="text-titleMedium text-tropicalblue-700">{name}</h3>
        <span className="text-titleSmall">님의 인증제 점수는</span>
      </div>
      <div className="flex items-center gap-[1.12rem]">
        <h1 className="text-titleLarge px-[2.25rem] py-[0.75rem] text-tropicalblue-500 bg-gray-200 rounded-[6.25rem]">
          {score}점
        </h1>
        <span className="text-titleSmall">입니다.</span>
      </div>
    </div>
  );
};
