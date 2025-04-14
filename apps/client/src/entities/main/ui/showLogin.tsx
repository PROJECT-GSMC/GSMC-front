import { Button } from "@repo/ui/button";

const ShowLogin = () => {
  return (
    <div className="mt-[1.88rem] mb-[6rem]">
      <h1 className="text-titleSmall">로그인 후</h1>
      <div className="flex items-center gap-1">
        <h1 className="text-tropicalblue-800 text-titleMedium">GSMC </h1>
        <h1 className="text-titleSmall"> 를 이용해주세요</h1>
      </div>
      <div className="flex gap-2 mt-[1.88rem]">
        <Button label="로그인" isActive variant="blue" />
        <Button label="회원가입" isActive variant="skyblue" />
      </div>
    </div>
  );
};

export default ShowLogin;
