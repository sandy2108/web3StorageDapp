import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlignRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#000000] relative">
      <div className="max-w-[1280px] mx-auto px-4 py-9">
        <div className="flex items-center justify-center">
          <div className="w-full flex z-10 text-[#FFFFFF] bg-[#151515]/50 justify-between  border-[#505050]/50 text-[16px] leading-4 font-normal py-2 px-5 items-center space-x-10 border rounded-full">
            <Link href="/" className="z-10">
              <h1 className="text-md md:text-2xl font-semibold text-primary">
                Web3Storage
              </h1>
            </Link>

            <div className="flex items-center justify-center space-x-4">
              <div className="hidden md:flex items-center justify-between gap-3">
                <Link
                  href="https://web3-storge.vercel.app/"
                  target="_blank"
                  className="cursor-pointer text-primary text-[16px] hover:text-primary/50"
                >
                  Home
                </Link>
              </div>

              <div className="md:flex z-10 hidden items-center justify-between border border-[#505050] px-2 py-1 bg-transparent space-x-2 rounded-[20px]">
                <Link href="https://twitter.com/Sanjaysk2108" target="_blank">
                  <Image
                    src="/x.png"
                    width={24}
                    height={24}
                    alt="Twitter"
                    className="cursor-pointer hover:shadow-custom"
                  />
                </Link>

                <Link href="https://t.me/Sandy0209" target="_blank">
                  <Image
                    src="/tg.png"
                    width={24}
                    height={24}
                    alt="Telegram"
                    className="cursor-pointer hover:shadow-custom"
                  />
                </Link>
              </div>
              <ConnectButton />
              <div className="md:hidden flex">
                <AlignRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
