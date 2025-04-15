import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Controller, useForm } from "react-hook-form";
import File from "../../../shared/ui/file";

interface ModalProps {
  onClose: () => void;
  type: "CERTIFICATE" | "TOPCIT" | "READ_A_THON";
}

const Modal = ({ onClose, type }: ModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  return (
    <div className=" inset-0  flex flex-col items-center w-[37.5rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-[6.25rem] py-[4.94rem]">
      <h1 className="text-title4s">
        {type === "TOPCIT"
          ? "TOPCIT"
          : type === "CERTIFICATE"
            ? "자격증"
            : "독서로"}
      </h1>

      <form
        className="w-full"
        onSubmit={handleSubmit((data) => {
          const finalData = {
            ...data,
            activityType: type,
          };
        })}
      >
        <Controller
          name="certification"
          control={control}
          render={({ field }) => (
            <Input label="자격증" {...field} type="text" />
          )}
        />
        <Controller
          name="file"
          control={control}
          render={({ field }) => <File label="" {...field} />}
        />
        <Button isActive onClick={onClose} label="뒤로가기" variant="skyblue" />
        <Button isActive={isValid} label="작성 완료" variant="blue" />
      </form>
    </div>
  );
};

export default Modal;
