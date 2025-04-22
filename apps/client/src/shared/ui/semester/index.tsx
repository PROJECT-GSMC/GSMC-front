import { Button } from "@repo/ui/button";

interface SemesterProps {
  value: number;
  onChange: (value: number) => void;
}

const Semester = ({ value, onChange }: SemesterProps) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-label">학기</label>
      <div className="flex gap-[0.5rem] mt-[0.5rem] w-full">
        <Button
          label="1학기"
          variant={value === 1 ? "blue" : "skyblue"}
          onClick={() => onChange(1)}
        />
        <Button
          label="2학기"
          variant={value === 2 ? "blue" : "skyblue"}
          onClick={() => onChange(2)}
        />
      </div>
    </div>
  );
};

export default Semester;
