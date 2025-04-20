import { Button } from "@repo/ui/button";
import { PostType } from "../../../../../packages/ui/src/types/postType"
import Header from "../../../src/shared/ui/header";
import Image from "next/image";

interface DetailProps {
  params: {
    id: string
  }
  data: PostType
}


const DetailPage = ({ params, data }: DetailProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-[3rem]">
        <div className="flex flex-col w-[37.5rem] gap-[1.75rem]">
          <header className="flex flex-col w-full gap-[0.5rem]">
            <h1 className="text-[2.25rem] font-semibold">{data?.title ?? "Title"}</h1>
            <h3 className="text-[0.75rem] text-[#767676] text-right font-normal">{"Author"} . {data?.categoryName ?? "Area"}</h3>
            <div className="w-full h-[0.5px] bg-[#A6A6A6]"></div>
          </header>

          <main className="flex flex-col gap-[3rem] ">
            {data?.imageUrl &&
              <div className="h-[21.215rem] bg-slate-600">
                <Image src={data?.imageUrl} alt="img" className="w-full" />
              </div>
            }
            <section className="flex flex-col gap-[1rem]">
              <h2 className="text-[1.5rem] font-semibold">{"Category: "}</h2>
              <p className="text-[1.25rem] font-normal min-h-[29.9375rem]">{data?.content}</p>
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
