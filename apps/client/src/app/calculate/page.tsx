import { Calculate } from "@widgets/calculate/ui";

const CalculatePage = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:px-6">
      <div className="flex flex-col gap-[3.06rem] mt-[1.88rem] max-w-[37.5rem] w-full">
        <h1 className="text-tropicalblue-700 text-titleSmall sm:text-titleMedium mx-4">
          점수 계산
        </h1>
        <Calculate />
      </div>
    </div>
  );
};

export default CalculatePage;
