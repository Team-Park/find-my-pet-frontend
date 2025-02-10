import { ReactNode } from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
  return <div className="flex justify-center w-full">
    <div className="md:w-[70%] w-full">
      {children}
    </div>
    </div>;
}
