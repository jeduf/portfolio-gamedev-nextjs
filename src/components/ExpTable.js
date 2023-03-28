import { useState, useEffect } from 'react';
import styles from '@/styles/expTable.module.css';
import { remark } from 'remark';
import html from 'remark-html';

function ExpTable({ data }) {
  const companyNames = data.map((company) => company.fileName);

  const [selectedCompany, setSelectedCompany] = useState(companyNames[0]);

  useEffect(() => {
    handleButtonClick(companyNames.indexOf(selectedCompany));
  }, [selectedCompany]);

  const fadeControl = () => {
    const compInfo = document.querySelector(`.${styles.expTable__companyInfo}`);
    compInfo.classList.add("fade-out");
    setTimeout(() => {
      compInfo.classList.remove("fade-out");
      compInfo.classList.add("fade-in");
    }, 300);
    setTimeout(() => {
      compInfo.classList.remove("fade-in");
    }, 600);
  };

  const selectedCompanyData = data.find(
    (company) => company.fileName === selectedCompany
  );

  const handleButtonClick = (index) => {
    document.documentElement.style.setProperty('--selected-company-index', index);
  };

  const { data: companyData, content: companyContent } = selectedCompanyData;

  const parsedContent = selectedCompanyData.content;

  return (
    <div className={styles.expTable__parent}>
      <div className={styles.expTable__titleButtons}>
        {companyNames.map((companyName) => (
          <button
            key={companyName}
            onClick={() => { fadeControl(), setTimeout(() => { setSelectedCompany(companyName), handleButtonClick(companyNames.indexOf(companyName)) }, 300) }}
            className={
              selectedCompany === companyName
                ? `${styles.expTable__titleButton} ${styles.active}`
                : styles.expTable__titleButton
            }
          >
            {companyName.replace('.md', '')}
          </button>
        ))}
      </div>
      <div className={styles.expTable__companyInfo}>
        <h1 className={styles.expTable__companyTitle}>
          {companyData.title}
          <span className={styles.expTable__companyName}> @ {companyData.company}
          </span>
        </h1>
        <p className={styles.expTable__date}>{companyData.date}</p>
        <ul className={styles.expTable__description} dangerouslySetInnerHTML={{ __html: parsedContent }} />
      </div>
    </div>
  );
}

export default ExpTable;