import Head from 'next/head';
import { siteTitle } from '@/components/Layout';
import PageHeaders from "@/components/PageHeaders";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from '@/styles/about.module.css';
import { remark } from 'remark';
import html from 'remark-html';


export default function About({ posts, contentHtml }) {
    return (
        <div className={styles.about}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <PageHeaders />
            <div className={styles.about__content}>
                <div className={styles.about__contentPara} dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
            </div>
            <div className={styles.about__aboutPhotoDiv}>
                <img className={styles.about__aboutPhoto} src={posts[0].frontmatter.about_image} alt={posts[0].frontmatter.about_image_alt} />
            </div>
        </div>
    )
}
export async function getStaticProps() {
    const files = fs.readdirSync(path.join('content/about'))
    const posts = files.map((filename) => {
        const slug = filename.replace('.md', '')

        const markdownWithMeta = fs.readFileSync(
            path.join('content/about', filename),
            'utf-8'
        )

        const { data: frontmatter, content } = matter(markdownWithMeta)

        return {
            slug,
            frontmatter,
            content,
        }
    })

    const processedContent = await remark()
        .use(html)
        .process(posts[0].content);
    const contentHtml = processedContent.toString();

    return {
        props: {
            contentHtml,
            posts,
        },
    }
}