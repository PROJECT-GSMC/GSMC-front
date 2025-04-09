import { Button } from "@repo/ui/button";
import Header from "../../src/shared/ui/header";

const DetailPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-[37.5rem] gap-[1.75rem]">
          <header className="flex flex-col w-full gap-[0.5px]">
            <h1 className="text-[2.25rem] font-semibold">주제 123</h1>
            <h3 className="text-[0.75rem] text-[#767676] text-right font-normal">모태환   .   1학기  .  전공영역</h3>
            <div className="w-full h-[0.5px] bg-[#A6A6A6]"></div>
          </header>

          <main className="flex flex-col gap-[3rem]">
            <div className="h-[21.215rem] bg-slate-600"></div>
            <section>
              <h2 className="text-[1.5rem] font-semibold">카테고리: 교내수상</h2>
              <p className="text-[1.25rem] font-normal">
                여행은 새로운 경험과 배움을 선사한다. 낯선 도시를 거닐며 문화와 역사를 직접 체험할 수 있고,
                사람들과 소통하며 시야를 넓힐 수 있다. 또한 예상치 못한 상황을 겪으며 문제 해결 능력도 키워진다.
                여행을 통해 우리는 익숙한 일상을 벗어나 새로운 시각을 얻고, 더 성장한 자신을 발견할 수 있다.
                결국 여행은 단순한 이동이 아니라, 자신을 발전시키는 과정이다.
              </p>
            </section>
          </main>

          <footer className="flex gap-[1.56rem] w-full">
            <Button label="수정하기" variant="blue" width="w-full" isActive />
            <Button label="뒤로가기" variant="skyblue" width="w-full" isActive />
          </footer>

        </div>
      </div>
    </>
  );
};

export default DetailPage;
