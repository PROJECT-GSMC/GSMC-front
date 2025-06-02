import TextLogo from "@repo/shared/textLogo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sm:py-[1.4rem] py-[1rem] flex w-full justify-center items-center border-b">
      <Link href="/" className="flex items-center">
        <TextLogo />
      </Link>
    </header>
  );
};

export default Header;
