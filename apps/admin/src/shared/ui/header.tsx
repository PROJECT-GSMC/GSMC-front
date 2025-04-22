import TextLogo from "@repo/ui/textLogo";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-[1.4rem] flex w-full justify-center items-center border-b">
      <Link href="/" className="flex items-center">
        <TextLogo />
      </Link>
    </header>
  );
};

export default Header;
