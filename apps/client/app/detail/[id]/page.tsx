import Image from "next/image";

import { Button } from "@repo/ui/button";
import { Activity, Others, Reading } from "../../../../../packages/ui/src/types/evidences";
import { isActivity, isOthers, isReading } from "../../../../../packages/ui/src/utils/handlePost";

import Header from "@shared/ui/header";

interface DetailProps {
  data: Activity | Reading | Others
}

const DetailPage = ({ data }: DetailProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-[3rem]">
        <div className="flex flex-col w-[37.5rem] gap-[1.75rem]">
          <header className="flex flex-col w-full gap-[0.5rem]">
            <h1 className="text-[2.25rem] font-semibold">
              {(isActivity(data) || isReading(data)) ? data.title : "Title"}
            </h1>
            <h3 className="text-[0.75rem] text-[#767676] text-right font-normal">
              {/* 게시물을 작성한 사람 이름 -> 현재 로그인 된 사람 이름*/}
              {"모태환"}
              {" . "}
              {(isActivity(data) || isOthers(data)) ? data.categoryName : "Area"}
            </h3>
            <div className="w-full h-[0.5px] bg-[#A6A6A6]"></div>
          </header>

          <main className="flex flex-col gap-[3rem] ">
            {isActivity(data) && data.imageUrl && (
              <div className="h-[21.215rem] bg-slate-600">
                <Image src={data.imageUrl} alt={data.title ?? "img"} fill className="w-full" />
              </div>
            )}
            <section className="flex flex-col gap-[1rem]">
              <h2 className="text-[1.5rem] font-semibold">
                {(isActivity(data) || isOthers(data)) ? `카테고리: ${data.categoryName}` : (isReading(data) && data.author) ? data.author : "Author"}
              </h2>
              <p className="text-[1.25rem] font-normal min-h-[29.9375rem]">
                {(isActivity(data) || isReading(data)) ? data.content : ""}
              </p>
            </section>
          </main>

          <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
            <Button label="수정하기" variant="blue" className="w-full" />
            <Button label="뒤로가기" variant="skyblue" className="w-full bg-white" />
          </footer>
        </div>
      </div>
    </>
  );
};


export default DetailPage;
