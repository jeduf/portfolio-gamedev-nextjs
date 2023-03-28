import { siteTitle } from "@/components/Layout";
import Head from "next/head";
import styles from '@/styles/works.module.css';
import matter from 'gray-matter';
import fs from 'fs';
import ProjectCard from "@/components/ProjectCard";
import { useState } from 'react';
import PageHeaders from "@/components/PageHeaders";

const Works = ({ projects }) => {

  const [openIndex, setOpenIndex] = useState(-1);

  const handleCardClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <PageHeaders />
      <div className={styles.gamesContainer}>
        {projects.map((game, index) => (
          <ProjectCard key={index} {...game} isOpen={openIndex === index}
            onClick={() => handleCardClick(index)} />
        ))}
        <div className={styles.moreContainer}><a>I have experience working on a variety of projects, including unreleased games and proprietary projects that I am not able to showcase at this time. Throughout my career, I have gained valuable skills and expertise that allows me to adapt to different project requirements and make a positive impact. Although I cannot share specific details about these projects, I am confident in my ability to apply my experience to future opportunities.</a></div>
      </div>
    </div>
  );
};

export default Works;

export async function getStaticProps() {
  const fileContents = fs.readFileSync('content/works/projects.md', 'utf8');
  const { data, content } = matter(fileContents);

  const projects = await Promise.all(data.projects.map(async (project) => {
    let images = [];
    if (project.appStoreID) {
      // Retrieve the icon and screenshots for the app from the App Store API

      const appId = project.appStoreID;
      const url = `https://itunes.apple.com/lookup?id=${appId}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const app = data.results[0];
        // images.push(app.artworkUrl100); // Add the app icon to the list of images
        if (project.images)
          images = images.concat(project.images); // Add the local images to the list of images
        images = images.concat(app.screenshotUrls); // Add the app screenshots to the list of images
      } catch (error) {
        console.error(error);
      }
    } else {
      // Use the local images for the project
      images = project.images;
    }

    return {
      name: project.name,
      images,
      description: project.description,
      url: project.url,
    };
  }));

  return {
    props: {
      projects,
    },
  };
}