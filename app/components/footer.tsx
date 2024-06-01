import Image from 'next/image';
import Github from '../utils/github.png';
import AboutUs from '../utils/abouts.png';

const Footer = () => {
  return (
    <div className="flex flex-col w-full p-5">
      <div className="flex justify-center items-center gap-4 mb-2">
        <a href="https://github.com/subinoybiswas/clippy" target='__blank'>
          <Image src={Github} alt="GitHub Logo" width={50} height={50} className='opacity-70 hover:opacity-100'/>
        </a>
        <a href="/">
          <Image src={AboutUs} alt="About Us Logo" width={50} height={50} className='opacity-70 hover:opacity-100'/>
        </a>
      </div>
      <div className="text-center">
        <p className="text-base text-slate-300/80">Copyright &copy;  By Clippy</p>
        <p className="text-xs text-slate-300/80">All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
