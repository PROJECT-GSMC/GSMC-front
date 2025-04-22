"use client";

import Post from "@repo/ui/post";
import Header from "../../src/shared/ui/header";
import Mock from "../../src/shared/mocks/data/evidenceMock.json";

const ExamplePage = () => {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-titleMedium text-left my-[2.38rem]">
          쓰기 예시 페이지
        </h1>
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
          {
            Mock.map(data => {
              return(
                <Post key={data.id}
                  data={{
                    id: data.id,
                    title: data.title ?? data.evidenceType,
                    content: data.content ?? "",
                    imageUrl: data.imageUri ?? data.fileUri ?? "",
                    status: data.status,
                    categoryName: data.categoryName ?? data.author,
                  }}
                  isExample={true}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
