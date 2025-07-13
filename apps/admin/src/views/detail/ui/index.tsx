"use client";

import type { PostStatus } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useMember } from "@/entities/member/model/memberContext";
import { useGetMember } from "@/shared/model/useGetMember";
import { useChangeEvidenceStatus } from "@/views/check-post/model/useChangeEvidenceStatus";
import { useGetPosts } from "@/views/check-post/model/useGetPosts";

export default function DetailView() {
  const { id } = useParams();
  const { member: student, setMember } = useMember();
  const { handlePostState } = useChangeEvidenceStatus(Number(id));

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const status = searchParams.get("status") as PostStatus;

  const { data: studentData, isError: isStudentError } = useGetMember(
    decodeURIComponent(String(student?.email ?? email)),
  );

  const { posts, isError: isPostError } = useGetPosts(
    String(student?.email ?? email),
    status,
  );

  useEffect(() => {
    if (!student && studentData?.data) {
      setMember(studentData.data);
    }
  }, [student, studentData, setMember]);

  if (isPostError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  if (isStudentError) {
    toast.error("회원 정보를 불러오지 못했습니다.");
  }

  const post = posts.find((post) => post.id === Number(id));

  if (!post) return <p>존재하지 않는 게시물입니다.</p>;

  const title = (() => {
    if (isActivity(post) || isReading(post)) return post.title;
    if (isOthers(post)) return post.evidenceType
    return null;
  })();

  const imageUri = isActivity(post) ? post.imageUri : null;

  const subTitle = (() => {
    if (isReading(post)) return `${post.author}`;
    if (isOthers(post)) return getCategoryName(post.categoryName);
    if (isActivity(post)) return getCategoryName(post.categoryName);
    return null;
  })();

  return (
    <div className="flex flex-col items-center mt-12 px-4 sm:px-8">
      <div className="flex flex-col w-full max-w-[600px] gap-7">
        <header className="flex flex-col w-full gap-2">
          <h1 className="text-[1.7rem] font-semibold sm:text-[2.25rem]">
            {title}
          </h1>
          <div className="w-full h-px bg-[#A6A6A6]" />
        </header>
        <main className="flex flex-col gap-12">
          {imageUri == null ? null : (
            <div className="max-h-[21.215rem] w-full aspect-video bg-slate-600">
              <Image
                alt="gsmc"
                className="object-cover w-full h-full"
                height={337}
                src={imageUri}
                width={600}
              />
            </div>
          )}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{subTitle}</h2>
            <p className="text-lg font-normal min-h-[400px] break-words">
              {isOthers(post) ? (
                <a
                  className="underline"
                  href={post.fileUri}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  증빙 파일 보기
                </a>
              ) : (
                post.content
              )}
            </p>
          </section>
        </main>
        <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
          {post.status === "PENDING" ? (
            <span className="flex w-full mt-[1.25rem] gap-[1rem] items-center justify-center text-body5 text-white">
              <button
                className="bg-tropicalblue-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem] flex-1"
                onClick={handlePostState("APPROVE")}
              >
                통과
              </button>
              <button
                className="bg-errors-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem] flex-1"
                onClick={handlePostState("REJECT")}
              >
                거절
              </button>
            </span>
          ) : null}
        </footer>
      </div>
    </div>
  );
}
