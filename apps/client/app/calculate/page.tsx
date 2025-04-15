import Header from "../../src/shared/ui/header";
import { Calculate } from "../../src/widgets/calculate/ui";

const CalculatePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <div className="flex flex-col gap-[3.06rem]">
        <h1 className="text-tropicalblue-700 text-titleMedium">점수 계산</h1>
        <Calculate />
      </div>
    </div>
  );
};

export default CalculatePage;
