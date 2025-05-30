import { Header } from "@/shared/ui";
import ExampleWidget from "@/widgets/example/ui";

export default function ExampleView() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem] px-[1rem] sm:px-[0rem] min-w-[17.9rem] overflow-auto">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium text-left my-[2.38rem]">
          쓰기 예시 페이지
        </h1>
        <ExampleWidget />
      </div>
    </div>
  );
}
