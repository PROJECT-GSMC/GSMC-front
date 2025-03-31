import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Controller, useForm } from "react-hook-form";
import Textarea from "../../../shared/ui/textarea";
import Header from "../../../shared/ui/header";
import Semester from "../../../shared/ui/semester";
import File from "../../../shared/ui/file";
const BookWidget = () => {
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-col items-center">
      <Header />
      <form
        className="flex gap-[2rem] flex-col justify-center"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <h1 className="text-main-700 text-titleMedium my-[2.38rem]">
          독서 영역
        </h1>
        <Controller
          name="title"
          control={control}
          rules={{
            required: "제목을 입력해주세요.",
          }}
          render={({ field }) => <Input label="제목" {...field} />}
        />
        <Controller
          name="author"
          control={control}
          rules={{
            required: "저자를 입력해주세요.",
          }}
          render={({ field }) => <Input label="저자" {...field} />}
        />
        <Controller
          name="page"
          control={control}
          rules={{
            required: "페이지를 입력해주세요.",
          }}
          render={({ field }) => (
            <Input type="number" label="페이지" {...field} />
          )}
        />
        <Controller
          name="semester"
          control={control}
          rules={{
            required: "학기를 선택해주세요.",
          }}
          render={({ field }) => <Semester {...field} />}
        />
        <Controller
          name="content"
          control={control}
          rules={{
            required: "내용을 입력해주세요.",
          }}
          render={({ field }) => <Textarea isBook {...field} />}
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
          <Button type="secondary" isActive label="임시저장" />
          <Button isActive={false} type="primary" label="작성 완료" />
        </div>
      </form>
    </div>
  );
};

export default BookWidget;
