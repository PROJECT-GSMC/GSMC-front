import { Header, Post } from "@/shared/ui";
import { usePost } from "@repo/ui/store/postProvider";
import Mock from "@shared/mocks/data/evidenceMock.json";
import { post } from "node_modules/@repo/ui/src/types/evidences";

export default function ExampleView() {
  const { setPost } = usePost();
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
                onClick={() => {
                  setPost(data as post);
                }}
                key={data.id}
                data={data as post}
                isExample={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
