import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { FixScore } from "@shared/api/fixScore";
import Dropdown from "@shared/ui/dropdown";
import File from "@shared/ui/file";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";


import { sendCertification } from "../api/sendCertification";
import { sendEvidence } from "../api/sendEvidence";
import type { Evidence } from "../model/evidence";
import { bookOption, options } from "../model/options";

interface ModalProps {
  onClose: () => void;
  type: "CERTIFICATE" | "TOPCIT" | "READ_A_THON" | "HUMANITY";
}

const Modal = ({ onClose, type }: ModalProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<Evidence>({ mode: "onChange" });

  const handleCloseModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const handleStopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
    },
    [],
  );

  const handleSwitchEvidence = useCallback(async (data: Evidence) => {
    switch (type) {
      case "CERTIFICATE": {
        const res = await sendCertification({
          name: data.categoryName,
          file: data.file,
          acquisitionDate: String(data.acquisitionDate),
        });
        if (res.status === 201) {
          toast.success("자격증이 등록되었습니다.");
          router.replace("/");
          onClose();
        } else if (res.status === 422) {
          toast.error("이미 등록된 자격증입니다.");
        } else {
          toast.error("자격증 등록에 실패했습니다.");
        }

        break;
      }
      case "TOPCIT": {
        const res = await FixScore({
          categoryName: "MAJOR-TOPCIT_SCORE",
          score: Number(data.value),
        });
        if (res.status === 201) {
          toast.success("TOPCIT 점수가 등록되었습니다.");
          router.replace("/");
          onClose();
        } else {
          toast.error("TOPCIT 점수 등록에 실패했습니다.");
        }

        break;
      }
      case "READ_A_THON": {
        const res = await sendEvidence(data);
        if (res.status === 201) {
          toast.success("독서로가 등록되었습니다.");
          router.replace("/");
          onClose();
        } else if (res.status === 422) {
          toast.error(
            "이미 독서로 단계가 동록되어 있습니다. 삭제하고 이용해주세요"
          );
        } else {
          toast.error("독서로 등록에 실패했습니다.");
        }

        break;
      }
      case "HUMANITY": {
        await sendCertification({
          name: data.option.send,
          file: data.file,
          acquisitionDate: String(data.acquisitionDate),
        });
      }
    }
  }, [onClose, router, type])

  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    void handleSubmit(handleSwitchEvidence)(e)
  }, [handleSubmit, handleSwitchEvidence])

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleCloseModal}
    >
      <div
        className="w-[37.5rem] bg-white md:px-[6.25rem] px-[1.5rem] py-[4.94rem] rounded-xl"
        onClick={handleStopPropagation}
      >
        <h1 className="text-title4s mb-6 text-center">
          {type === "TOPCIT"
            ? "TOPCIT"
            : (type === "READ_A_THON"
              ? "독서로"
              : "자격증")}
        </h1>

        <form
          className="w-full flex flex-col gap-[1.5rem]"
          onSubmit={handleFormSubmit}
        >
          {type === "HUMANITY" || type === "READ_A_THON" ? (
            <Controller
              control={control}
              name="option"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field }) => (
                <Dropdown
                  label={type === "HUMANITY" ? "자격증" : "독서로"}
                  options={type === "HUMANITY" ? options : bookOption}
                  {...field}
                />
              )}
              rules={{ required: true }}
            />
          ) : (
            <InputContainer
              label={type === "TOPCIT" ? "TOPCIT 점수" : "자격증 작성하기"}
            >
              <Input
                control={control}
                name={type === "TOPCIT" ? "value" : "categoryName"}
                rules={{ required: true }}
                type={type === "TOPCIT" ? "number" : "text"}
              />
            </InputContainer>
          )}
          {(type === "CERTIFICATE" || type === "HUMANITY") && (
            <InputContainer label="취득일">
              <Input
                control={control}
                name="acquisitionDate"
                rules={{ required: true }}
                type="date"
              />
            </InputContainer>
          )}
          <Controller
            control={control}
            name="file"
            // eslint-disable-next-line react/jsx-no-bind
            render={({ field }) => <File label="파일 첨부" {...field} />}
            rules={{ required: true }}
          />
          <div className="mt-[3.97rem] flex flex-col gap-[0.75rem]">
            <Button label="뒤로가기" variant="skyblue" onClick={onClose} />
            <Button
              label="작성 완료"
              state={isValid ? "default" : "disabled"}
              type="submit"
              variant="blue"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
