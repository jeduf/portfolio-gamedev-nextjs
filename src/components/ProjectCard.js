import { useState } from 'react';
import styles from '@/styles/projectCard.module.css';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRef } from 'react';


const ProjectCard = ({ name, images, url, description, isOpen, onClick }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onHovered, setOnHovered] = useState(false);
  const descriptionRef = useRef(null);
  const cardRef = useRef(null);

  const handleCardClick = () => {
    onClick();
  };

  useEffect(() => {
    let intervalId;
    if (onHovered || isOpen) {
      intervalId = setInterval(() => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
      }, 2000);
    }
    else {
      setCurrentIndex(0);
    }
    return () => clearInterval(intervalId);
  }, [onHovered || isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowDescription(true);
    }
    else {
      setShowDescription(false);
      if (cardRef.current)
        cardRef.current.style.height = `30vh`;
    }
  }, [isOpen]);

  useEffect(() => {
    if (showDescription) {
      const descriptionHeight = descriptionRef.current ? descriptionRef.current.clientHeight : 0;
      if (cardRef.current)
        cardRef.current.style.height = `calc(${descriptionHeight}px + 30vh)`;
    }
  }, [showDescription]);

  return (
    <div className={`${styles.card} ${showDescription ? styles.cardActive : ''} `} onClick={handleCardClick} ref={cardRef} >
      <div className={styles.cardImageContainer}><div className={`${styles.cardImage} ${showDescription ? styles.cardImageActive : ''}`} style={{ backgroundImage: `url(${images[currentIndex]})` }} onMouseEnter={() => setOnHovered(true)}
        onMouseLeave={() => setOnHovered(false)}></div>
        <h2 className={`${styles.cardName} ${showDescription ? styles.cardNameActive : ''}`}>{name}</h2>
      </div>
      {showDescription && <div className={styles.cardDescription} ref={descriptionRef} >{<div className={styles.cardDescriptionContent}><p class={styles.descriptionText}>{description}</p> <Link href={url}>Website</Link></div>}</div>}
    </div>
  );
};

export default ProjectCard;