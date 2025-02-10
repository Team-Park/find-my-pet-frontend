import { getAllPosts } from "@/lib/parsePost";
import { CustomMDX } from "@/app/_components/CustomMDX";

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const { slug } = params;

  const _slug = "/posts/" + [...slug].join("/");
  const posts = await getAllPosts()
  const post = posts.find((v) => v.slug === _slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const _slug = "/posts/" + [...slug].join("/");
  const posts = await getAllPosts()
  const post = posts.find((v) => v.slug === _slug);
  if (post === undefined) {
    return <div>Not Found</div>;
  }

  return (
    <article className="flex-col items-center">
      <div className="flex flex-col gap-1 mb-[80px]">
        <div className="sm:text-5xl font-semibold text-2xl">{post.title}</div>
        <div className="text-medium text-gray-500 dark:text-gray-300">{post.subtitle}</div>
        <div className="flex gap-1">
          <div className="text-xs font-light text-gray-600 dark:text-gray-300">{post.date}</div>
        </div>
      </div>
      <CustomMDX source={post.content} />
    </article>
  );
}
