import Image from "next/image";
import { getAllPosts, test } from "@/lib/parsePost";
import image from "@/static/image/posts_banner.jpg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type PostMatter = {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  thumbnail: string;
};

export type Post = PostMatter & {
  slug: string;
  content: string;
};
export type Test = PostMatter & {
  slug: string;
};




// ✅ Server Component 적용
export default async function PostPage() {
  let posts = await test();
  posts = posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  const truncate = (str:string, limit_length: number) => {
    return str.length > limit_length ? str.substring(0, limit_length) + '...' : str;
}

  return (
    <div className="flex flex-col w-full items-center gap-6">
      {/* ✅ 배너 영역 */}
      <div className="w-full flex justify-center">
        <div className="sm:w-[60%] w-[90%] h-[250px] rounded-md border flex">
          <div className="flex justify-center items-center relative w-full h-full ">
            <Image
              src={image}
              layout="fill"
              objectFit="contain"
              alt="banner image"
              placeholder="blur"
            />
          </div>
          <div className="w-full h-full md:p-6 p-3 flex flex-col justify-center items-end md:gap-6 gap-3 break-keep">
            <p className="font-bold md:text-xl lg:text-2xl text-sm">
              소중한 반려동물을 위해 꼭 알아야 할 정보를 제공합니다.
            </p>
          </div>
          <ul className="w-full">
        </ul>
        </div>
      </div>
      <section className='flex flex-col w-full items-center justify-center gap-10 my-20'>
                <div className='grid 2xl:grid-cols-3 lg:grid-cols-2 xl:gap-8 grid-cols-1 gap-10'>
                    {
                        posts.map((post) => {
                            return (
                                <>
                                    <div className='xs:w-[390px] rounded-md flex flex-col bg-gray-100 justify-between'>
                                        <div className='flex justify-center'>
                                          <div className="flex justify-center items-center relative w-full h-[220px] rounded-md">
                                              <Image src={post.thumbnail} layout="fill" objectFit="cover" alt={`${post.title} logo`} className="rounded-md"/>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col justify-start gap-4">
                                            <span className='font-bold text-xl'>{post.title}</span>
                                            <p className="h-[100px] text-sm">{truncate(post.description, 120)}</p>
                                            <div className='w-full flex justify-end'>
                                                <Link aria-label={`Go to ${post.title} post`} href={post.slug}>
                                                    <button aria-label={`Go to ${post.title} post`} className='bg-white border-none w-[80px] h-[40px] rounded-md cursor-pointer hover:bg-blue-400 transition-all ease-linear duration-200 flex justify-center items-center'>
                                                    <ArrowRight />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </section>
    </div>
  );
}
