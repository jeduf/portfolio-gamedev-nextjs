import Head from 'next/head';
import { siteTitle } from '@/components/Layout';
import styles from '@/styles/index.module.css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function Home({ posts }) {

  return (
    <div className={styles.index}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.index__content}>
        <h1 className={styles.index__nameH}>{posts[0].frontmatter.portf_name}</h1>
        <h1 className={styles.index__devH}>{posts[0].frontmatter.portf_job}</h1>
        <p className={styles.index__introP}>{posts[0].content}</p>
      </div>
      <div className={styles.index__bgPhotoDiv}>
        <img className={styles.index__bgPhoto} src={posts[0].frontmatter.bg_image} alt={posts[0].frontmatter.bg_image_alt} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content/index'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('content/index', filename),
      'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
      content,
    }

  })
  return {
    props: {
      posts,
    },
  }
}