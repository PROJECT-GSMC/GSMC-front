import { Button } from "@repo/ui/button";

interface SemesterProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Semester = ({ value, onChange }: SemesterProps) => {
  const handleButtonClick = (semester: string) => {
    onChange({
      target: { value: semester },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="w-full flex flex-col">
      <label className="text-label">학기</label>
      <div className="flex gap-[0.5rem] mt-[0.5rem] w-full">
        <Button
          label="1학기"
          variant={value === "1학기" ? "blue" : "skyblue"}
          isActive
          onClick={() => handleButtonClick("1학기")}
        />
        <Button
          label="2학기"
          variant={value === "2학기" ? "blue" : "skyblue"}
          isActive
          onClick={() => handleButtonClick("2학기")}
        />
      </div>
    </div>
  );
};

export default Semester;
