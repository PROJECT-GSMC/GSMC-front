import Image from "next/image";
import Textlogo from "../../asset/svg/textLogo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full py-[1.38rem] flex justify-around">
      <Link href={"/"}>
        <Image src={Textlogo} id="image" alt="logo" />
      </Link>
      <ul className="gap-[2rem] flex text-label text-gray-500 items-center text-body3">
        <Link href="/calculate">점수 계산</Link>
        <Link href="/descrition">설명</Link>
        <Link href="/posts">내 글 목록</Link>
      </ul>
    </header>
  );
};

export default Header;
