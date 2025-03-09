import { getAllPosts } from '@/lib/parsePost'
import type { MetadataRoute } from 'next'

type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: "monthly" | "always" | "hourly" | "daily" | "weekly" | "yearly" | "never" | undefined;
    priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const DOMAIN_URL = 'https://www.findmypet.site'

    const posts = await getAllPosts();

    const allPosts: SitemapEntry[] = posts.map((post) => ({
        url: `${DOMAIN_URL}${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    return [
        {
            url: `${DOMAIN_URL}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${DOMAIN_URL}/posts`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${DOMAIN_URL}/guide`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${DOMAIN_URL}/profile`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${DOMAIN_URL}/leaflet`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...allPosts
    ];
}
