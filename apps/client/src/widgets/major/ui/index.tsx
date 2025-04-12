import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Header from "../../../shared/ui/header";
import Semester from "../../../shared/ui/semester";
import Dropdown from "../../../shared/ui/dropdown";
import Textarea from "../../../shared/ui/textarea";
import File from "../../../shared/ui/file";
import { Activity } from "../../../shared/types/activity";
import { sendActivity } from "../../../shared/api/sendActivity";
import { toast } from "sonner";

interface beforeActivity {
  category1: string;
  category2: string;
  semester: number;
  title: string;
  content: string;
  file: File;
}

const MajorWidget = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<beforeActivity>({ mode: "onChange" });

  const category1 = useWatch({ control, name: "category1" });
  const category2 = useWatch({ control, name: "category2" });

  const categoryName = `${category1}-${category2}`;

  const onSubmit = (data: beforeActivity) => {
    const { category1, category2, ...restData } = data;
    const finalData: Activity = {
      ...restData,
      categoryName,
      activityType: "MAJOR",
    };

    sendActivity(finalData);
    errors
      ? toast.error("글 제출을 실패했습니다")
      : toast.success("글 제출을 성공했습니다");
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <form
        className="flex gap-[2rem] flex-col justify-center w-full max-w-[37.5rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-tropicalblue-700 text-titleMedium my-[2.38rem]">
          전공 영역
        </h1>
        <Controller
          name="category1"
          defaultValue=""
          control={control}
          rules={{
            required: "카테고리를 선택해주세요.",
          }}
          render={({ field }) => (
            <Dropdown
              label="카테고리 1"
              options={["example1", "example2"]}
              {...field}
            />
          )}
        />
        <Controller
          name="category2"
          defaultValue=""
          control={control}
          rules={{
            required: "카테고리를 선택해주세요.",
          }}
          render={({ field }) => (
            <Dropdown
              label="카테고리 2"
              options={["example1", "example2"]}
              {...field}
            />
          )}
        />
        <Controller
          name="semester"
          control={control}
          defaultValue={0}
          rules={{
            required: "학기를 선택해주세요.",
          }}
          render={({ field }) => <Semester {...field} />}
        />
        <Controller
          name="title"
          defaultValue=""
          control={control}
          rules={{
            required: "주제를 입력해주세요.",
          }}
          render={({ field }) => <Input label="주제" {...field} />}
        />
        <Controller
          name="content"
          control={control}
          rules={{
            required: "내용을 입력해주세요.",
          }}
          render={({ field }) => <Textarea {...field} />}
        />
        <Controller
          name="file"
          control={control}
          rules={{
            required: "파일을 선택해주세요.",
          }}
          render={({ field }) => <File label="이미지" {...field} />}
        />
        <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
          <Button isActive variant="skyblue" label="임시저장" />
          <Button isActive={isValid} variant="blue" label="작성 완료" />
        </div>
      </form>
    </div>
  );
};

export default MajorWidget;
