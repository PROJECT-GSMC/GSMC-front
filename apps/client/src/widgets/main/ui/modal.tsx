import { Controller, useForm } from "react-hook-form";
import File from "../../../shared/ui/file";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Evidence } from "../model/evidence";
import { sendCertification } from "../api/sendCertification";
import { FixScore } from "../../../shared/api/fixScore";
import { sendEvidence } from "../api/sendEvidence";
import Dropdown from "../../../shared/ui/dropdown";

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
                acquisitionDate: String(new Date()),
              });
            } else if (type === "TOPCIT") {
              FixScore({
                categoryName: "major-topcit-score",
                score: Number(data.categoryName),
              });
            } else {
              await sendEvidence(data);
            }
          })}
        >
          {type === "HUMANITY" ? (
            <Controller
              rules={{ required: true }}
              name="option"
              control={control}
              render={({ field }) => (
                <Dropdown
                  options={[
                    { name: "한자 1급", send: "한자 1급" },
                    { name: "한자 2급", send: "한자 2급" },
                    { name: "한자 3급", send: "한자 3급" },
                    { name: "한자 4급", send: "한자 4급" },
                    { name: "한국사 1급", send: "한국사 능력검정(1)" },
                    { name: "한국사 2급", send: "한국사 능력검정(2)" },
                    { name: "한국사 3급", send: "한국사 능력검정(3)" },
                  ]}
                  label="자격증"
                  {...field}
                />
              )}
            />
          ) : (
            <Controller
              rules={{ required: true }}
              name="categoryName"
              control={control}
              render={({ field }) => (
                <Input
                  label={
                    type === "TOPCIT"
                      ? "TOPCIT 점수"
                      : type === "CERTIFICATE"
                        ? "자격증 작성하기"
                        : "독서로 단계"
                  }
                  {...field}
                  type={type === "TOPCIT" ? "number" : "text"}
                />
              )}
            />
          )}
          {type === "CERTIFICATE" ||
            (type === "HUMANITY" && (
              <Controller
                control={control}
                name="acquisitionDate"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input label="취득일" type="date" {...field} />
                )}
              />
            ))}
          <Controller
            name="file"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <File label="" {...field} />}
          />
          <div className="mt-[3.97rem] flex flex-col gap-[0.75rem]">
            <Button
              isActive
              onClick={onClose}
              label="뒤로가기"
              variant="skyblue"
            />
            <Button isActive={isValid} label="작성 완료" variant="blue" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
