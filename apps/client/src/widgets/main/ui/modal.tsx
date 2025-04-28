import { Controller, useForm } from "react-hook-form";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";

import { Evidence } from "../model/evidence";
import { options } from "../model/options";
import { sendCertification } from "../api/sendCertification";
import { sendEvidence } from "../api/sendEvidence";

import { File, Dropdown } from "@shared/ui";
import { FixScore } from "@shared/api";

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
        className="w-[37.5rem] bg-white px-[6.25rem] py-[4.94rem] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-title4s mb-6 text-center">
          {type === "TOPCIT"
            ? "TOPCIT"
            : type === "CERTIFICATE"
              ? "자격증"
              : "독서로"}
        </h1>

        <form
          className="w-full flex flex-col gap-[1.5rem]"
          onSubmit={handleSubmit(async (data) => {
            if (type === "CERTIFICATE") {
              await sendCertification({
                name: data.categoryName,
                file: data.file,
                acquisitionDate: String(data.acquisitionDate),
              });
            } else if (type === "TOPCIT") {
              FixScore({
                categoryName: "major-topcit-score",
                score: Number(data.categoryName),
              });
            } else if (type === "READ_A_THON") {
              await sendEvidence(data);
            } else {
              sendCertification({
                name: data.option.send,
                file: data.file,
                acquisitionDate: String(data.acquisitionDate),
              });
            }
          })}
        >
          {type === "HUMANITY" ? (
            <Controller
              rules={{ required: true }}
              name="option"
              control={control}
              render={({ field }) => (
                <Dropdown options={options} label="자격증" {...field} />
              )}
            />
          ) : (
            <InputContainer
              label={
                type === "TOPCIT"
                  ? "TOPCIT 점수"
                  : type === "CERTIFICATE"
                    ? "자격증 작성하기"
                    : "독서로 단계"
              }>
              <Input
                control={control}
                rules={{ required: true }}
                name="categoryName"
              />
            </InputContainer>
          )}
          {type === "CERTIFICATE" ||
            (type === "HUMANITY" && (
              <InputContainer label="취득일">
                <Input
                  control={control}
                  rules={{ required: true }}
                  name="acquisitionDate"
                  type="date"
                />
              </InputContainer>
            ))}
          <Controller
            name="file"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <File label="" {...field} />}
          />
          <div className="mt-[3.97rem] flex flex-col gap-[0.75rem]">
            <Button
              onClick={onClose}
              label="뒤로가기"
              variant="skyblue"
            />
            <Button state={isValid ? "default" : "disabled"} label="작성 완료" variant="blue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
