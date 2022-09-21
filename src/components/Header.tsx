import dynamic from "next/dynamic";
import Link from "next/link";
import { SiTwitter } from "react-icons/si";
import { ImDatabase } from "react-icons/im";
const ConnectWalletBtn = dynamic(() => import("./ConnectWallet"), { ssr: false });
import Logo from "../images/lil-logo.png";

const Header = () => {
  return (
    <div className="w-full flex justify-between items-start">
      <span className="w-3/5">
        <Link href="https://lilnouns.wtf">
          <img src={Logo.src} alt="logo" className="cursor-pointer" />
        </Link>
      </span>

      <div className="flex justify-around items-center w-2/5">
        <Link href="https://dune.com/nvonpentz/lilblockparty">
          <a className="text-white text-2xl mr-2 md:mr-0">
            <ImDatabase />
          </a>
        </Link>
        <Link href="https://twitter.com/lilblockparty">
          <a className="text-white text-2xl mr-2 md:mr-0">
            <SiTwitter />
          </a>
        </Link>

        <Link href="#wtf">
          <a className="text-white text-2xl hover:underline mr-2 md:mr-0">WTF?</a>
        </Link>

        <span className="hidden md:block">
          <ConnectWalletBtn />
        </span>
      </div>
    </div>
  );
};

export default Header;
