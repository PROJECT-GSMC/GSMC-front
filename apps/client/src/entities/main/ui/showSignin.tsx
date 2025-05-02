import { Button } from "@repo/ui/button";
import Link from "next/link";

const ShowSignin = () => {
  return (
    <div className="m-4 sm:mt-[1.88rem] sm:mb-[6rem]">
      <h1 className="text-body3s sm:text-titleSmall">로그인 후</h1>
      <div className="flex items-center gap-1">
        <h1 className="text-body2s sm:text-titleMedium text-tropicalblue-800">
          GSMC{" "}
        </h1>
        <h1 className="text-body3s sm:text-titleSmall"> 를 이용해주세요</h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-[1.88rem]">
        <Link className="w-full" href="/signin">
          <Button label="로그인" state="default" variant="blue" />
        </Link>
        <Link className="w-full" href="/signup">
          <Button label="회원가입" state="default" variant="skyblue" />
        </Link>
      </div>
    </div>
  );
};

export default ShowSignin;
