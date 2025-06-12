import { Controller, useForm } from "react-hook-form";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";

import type { Evidence } from "../model/evidence";
import { bookOption, options } from "../model/options";
import { sendCertification } from "../api/sendCertification";
import { sendEvidence } from "../api/sendEvidence";

import File from "@shared/ui/file";
import { FixScore } from "@shared/api/fixScore";
import Dropdown from "@shared/ui/dropdown";
import { toast } from "sonner";

interface ModalProps {
  onClose: () => void;
  type: "CERTIFICATE" | "TOPCIT" | "READ_A_THON" | "HUMANITY";
}

const Modal = ({ onClose, type }: ModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<Evidence>({ mode: "onChange" });

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-[37.5rem] bg-white md:px-[6.25rem] px-[1.5rem] py-[4.94rem] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-title4s mb-6 text-center">
          {type === "TOPCIT"
            ? "TOPCIT"
            : type !== "READ_A_THON"
              ? "자격증"
              : "독서로"}
        </h1>

        <form
          className="w-full flex flex-col gap-[1.5rem]"
          onSubmit={handleSubmit(async (data) => {
            if (type === "CERTIFICATE") {
              const res = await sendCertification({
                name: data.categoryName,
                file: data.file,
                acquisitionDate: String(data.acquisitionDate),
              });
              if (res.status === 201) {
                toast.success("자격증이 등록되었습니다.");
                onClose();
              } else if (res.status === 422) {
                toast.error("이미 등록된 자격증입니다.");
              } else {
                toast.error("자격증 등록에 실패했습니다.");
              }
            } else if (type === "TOPCIT") {
              const res = await FixScore({
                categoryName: "MAJOR-TOPCIT_SCORE",
                score: data.value as number,
              });
              if (res.status === 201) {
                toast.success("TOPCIT 점수가 등록되었습니다.");
                onClose();
              } else {
                toast.error("TOPCIT 점수 등록에 실패했습니다.");
              }
            } else if (type === "READ_A_THON") {
              const res = await sendEvidence(data);
              if (res.status === 201) {
                toast.success("독서로가 등록되었습니다.");
                onClose();
              } else if (res.status === 422) {
                toast.error(
                  "이미 독서로 단계가 동록되어 있습니다. 삭제하고 이용해주세요"
                );
              } else {
                toast.error("독서로 등록에 실패했습니다.");
              }
            } else {
              sendCertification({
                name: data.option.send,
                file: data.file,
                acquisitionDate: String(data.acquisitionDate),
              });
            }
          })}
        >
          {type === "HUMANITY" || type === "READ_A_THON" ? (
            <Controller
              rules={{ required: true }}
              name="option"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={type === "HUMANITY" ? options : bookOption}
                  label={type === "HUMANITY" ? "자격증" : "독서로"}
                  {...field}
                />
              )}
            />
          ) : (
            <InputContainer
              label={type === "TOPCIT" ? "TOPCIT 점수" : "자격증 작성하기"}
            >
              <Input
                type={type === "TOPCIT" ? "number" : "text"}
                control={control}
                rules={{ required: true }}
                name={type === "TOPCIT" ? "value" : "categoryName"}
              />
            </InputContainer>
          )}
          {(type === "CERTIFICATE" || type === "HUMANITY") && (
            <InputContainer label="취득일">
              <Input
                control={control}
                rules={{ required: true }}
                name="acquisitionDate"
                type="date"
              />
            </InputContainer>
          )}
          <Controller
            name="file"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <File label="파일 첨부" {...field} />}
          />
          <div className="mt-[3.97rem] flex flex-col gap-[0.75rem]">
            <Button onClick={onClose} label="뒤로가기" variant="skyblue" />
            <Button
              type="submit"
              state={isValid ? "default" : "disabled"}
              label="작성 완료"
              variant="blue"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
