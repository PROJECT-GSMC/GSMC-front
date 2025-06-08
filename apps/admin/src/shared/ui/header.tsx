import TextLogo from "@repo/shared/textLogo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sm:py-[1.4rem] py-[1rem] flex w-full justify-center items-center border-b">
      <Link className="flex items-center" href="/">
        <TextLogo />
      </Link>
    </header>
  );
};

export default Header;
