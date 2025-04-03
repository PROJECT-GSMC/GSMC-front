import { Button } from "@repo/ui/button";

export const Information = () => {
  return (
    <div className="w-[350px] bg-main-100 py-[2.25rem] flex flex-col justify-between rounded-[1.25rem] h-[90vh] px-[2.45rem]">
      <h3 className="text-titleSmall text-main-700 mb-[3.5rem]">인적사항</h3>
      <div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="text-body1 text-gray-600">모태환</span>
          <small className="text-body2 text-gray-600">2학년 1반 04번</small>
        </div>
        <div className="text-main-700 mt-[1.25rem] mb-[2.56rem] text-titleMedium w-[17rem] h-[20rem] flex items-center justify-center rounded-[0.75rem] bg-white">
          2300점
        </div>
      </div>
      <div className="flex flex-col gap-[0.75rem]">
        <Button type="primary" isActive label="글 보러가기" />
        <Button type="secondary" isActive label="점수 관리" />
      </div>
    </div>
  );
};
