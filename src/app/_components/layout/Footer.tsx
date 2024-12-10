import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-center bg-gray-100">
      <footer className="w-[1280px] flex justify-center">
        <div className="w-[80%]  justify-between flex py-8 ">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold">파인드마이펫 🐶</div>
            <div className="text-xs"><b>Contact</b> team.findmypet.official@gmail.com <br/>Copyright findmypet. All rights reserved</div>
          </div>
          <div className="flex md:gap-10 gap-4">
            <Link target="_blank" href="https://equinox-cemetery-0bf.notion.site/1582b2350b22803f8a82c010dd708efd" className="md:text-base text-xs font-bold break-keep">서비스 소개</Link>
            <Link target="_blank" href="https://equinox-cemetery-0bf.notion.site/1582b2350b22800ca843f55223cadc7f" className="md:text-base text-xs font-bold break-keep">개인정보 처리방침</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
