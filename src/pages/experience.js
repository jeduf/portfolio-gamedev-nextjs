import { siteTitle } from "@/components/Layout";
import PageHeaders from "@/components/PageHeaders";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import styles from '@/styles/experience.module.css';
import Head from "next/head";
import ExpTable from "@/components/ExpTable";
import { remark } from 'remark';
import html from 'remark-html';


export default function Experience({ companyData }) {
  return (
    <div className={styles.experience}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <PageHeaders />
      <div className={styles.experience__content}>
        <ExpTable data={companyData} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), 'content/experience')

  const companyFiles = fs.readdirSync(contentDir)

  const companyData = await Promise.all(
    companyFiles.map(async (fileName) => {
      const filePath = path.join(contentDir, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf-8')

      const { data, content } = matter(fileContents)
      const parsedContent = await remark().use(html).process(content)


      return {
        fileName,
        content: parsedContent.toString(),
        data,
      }
    })
  )

  companyData.sort((a, b) => new Date(b.data.startDate) - new Date(a.data.startDate));

  return {
    props: {
      companyData,
    },
  }
}