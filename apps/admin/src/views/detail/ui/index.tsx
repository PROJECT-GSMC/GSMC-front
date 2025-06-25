"use client";

import type { post, postState } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useGetStudent } from "@/entities/check-post/model/useGetStudent";
import { useMember } from "@/entities/member/model/memberContext";
import { useChangeEvidenceState } from "@/views/check-post/model/useChangeEvidenceState";
import { useGetPosts } from "@/views/check-post/model/useGetPosts";

export default function DetailView() {
  const { id } = useParams();
  const { member: student, setMember } = useMember();
  const { handlePostState } = useChangeEvidenceState(Number(id));
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const status = searchParams.get("status") as postState | null;
  const { data: studentData, isError: isStudentError } = useGetStudent(
    decodeURIComponent(String(student?.email ?? email)),
  );
  const { data: studentPost, isError: isPostError } = useGetPosts(
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

  const posts: post[] = [
    ...(studentPost?.data.majorActivityEvidence ?? []),
    ...(studentPost?.data.humanitiesActivityEvidence ?? []),
    ...(studentPost?.data.readingEvidence ?? []),
    ...(studentPost?.data.otherEvidence ?? []),
  ];

  const post = posts.find((post) => post.id === Number(id));

  let title = "Title";
  let subTitle = "Author";
  let content = "";

  if (post) {
    if (isActivity(post) || isReading(post)) {
      title = post.title;
      content = post.content;
    }

    if (isActivity(post) || isOthers(post)) {
      subTitle = `카테고리: ${getCategoryName(post.categoryName)}`;
    } else if (isReading(post) && post.author) {
      subTitle = post.author;
    }
  }

  return (
    <div className="flex flex-col items-center mt-12 px-4 sm:px-8">
      <div className="flex flex-col w-full max-w-[37.5rem] gap-[1.75rem]">
        <header className="flex flex-col w-full max-w-[600px] gap-2">
          <h1 className="text-[1.7rem] font-semibold sm:text-[2.25rem] ">
            {title}
          </h1>
          <h3 className="text-sm text-[#767676] text-right font-normal">
            {post && isReading(post) ? post.author : "사용자"} {" . "}
            {post && (isActivity(post) || isOthers(post))
              ? getCategoryName(post.categoryName)
              : "Area"}
          </h3>
          <div className="w-full h-px bg-[#A6A6A6]" />
        </header>

        <main className="flex flex-col gap-12">
          {post &&
          isActivity(post) &&
          post.imageUri != null &&
          post.imageUri !== "" ? (
            <div className="max-h-[21.215rem]  w-full aspect-video bg-slate-600">
              <Image
                alt={post.title}
                className="object-cover w-full h-full"
                height={150}
                src={post.imageUri ?? ""}
                width={188}
              />
            </div>
          ) : null}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{subTitle}</h2>
            <p className="text-[1.25rem] font-normal min-h-[29.9375rem]">
              {content}
            </p>
          </section>
        </main>

        <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
          {post?.status === "PENDING" ? (
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
