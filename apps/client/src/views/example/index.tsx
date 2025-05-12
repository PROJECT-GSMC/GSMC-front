import { Header, Post } from "@/shared/ui";
import Mock from "@shared/mocks/data/evidenceMock.json";
import { postState } from "node_modules/@repo/ui/src/types/evidences";

export default function ExampleView() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem] px-[1rem] sm:px-[0rem] min-w-[17.9rem] overflow-auto">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium sm:text-left text-center my-[2.38rem]">
          쓰기 예시 페이지
        </h1>
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
          {Mock.map((data) => {
            return (
              <Post
                key={data.id}
                data={{
                  id: data.id as number,
                  title: data.title ?? data.evidenceType,
                  content: data.content ?? "",
                  imageUrl: data.imageUri ?? data.fileUri ?? "",
                  status: data.status as postState,
                  categoryName: data.categoryName ?? data.author,
                }}
                isExample={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
