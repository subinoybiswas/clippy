import Image from "next/image";
import Github from "../utils/github.png";
import AboutUs from "../utils/abouts.png";
import { useRouter } from "next/navigation";
import "./footer.css";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  const router = useRouter();
  const handleAbout = () => {
    router.push(`/aboutus`);
  };
  return (
    <div className="flex flex-col w-full p-5 absolute bottom-0 footer">
      <div className="flex justify-center items-center gap-4 mb-2 cursor-pointer">
        <a href="https://github.com/subinoybiswas/clippy" target="__blank">
          <Image
            src={Github}
            alt="GitHub Logo"
            width={20}
            height={20}
            className="opacity-70 hover:opacity-100"
          />
        </a>
        <Image
          src={AboutUs}
          alt="About Us Logo"
          width={20}
          height={20}
          className="opacity-70 hover:opacity-100"
          onClick={handleAbout}
        />
      </div>
      <div className="text-center">
        <p className=" text-[14px] text-slate-300/80">
          Copyright &copy; {year} By Clippy
        <p className="text-lg"></p>
        </p>
        <p className="text-[10px] text-slate-300/80">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
