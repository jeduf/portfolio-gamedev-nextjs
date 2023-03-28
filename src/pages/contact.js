import React from 'react';
import { siteTitle } from '@/components/Layout';
import Head from 'next/head';
import styles from '@/styles/contact.module.css';
import { useState } from 'react';
import PageHeader from '@/components/PageHeaders';


export default function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //   Form validation state
  const [errors, setErrors] = useState({});


  const [mailStatus, setMailStatus] = useState("awaiting")

  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   Handling form submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      const res = await fetch("/api/contactApi", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error !== "") {
        console.log(error);
        setMailStatus("failed")
        return;
      }
      setMailStatus("sent")
    }
    console.log(fullname, email, subject, message);
  };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <PageHeader />

      {mailStatus === "awaiting" &&
        <form className={styles.container} onSubmit={handleSubmit}>
          <div className={`${styles.topRow}`}>
            <div className={`${styles.email} ${styles.block}`}>
              <label htmlFor="frm-email">Email</label>
              <input
                id="frm-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>
            <div className={`${styles.name} ${styles.block}`}>
              <label htmlFor="frm-first">Full Name</label>
              <input
                id="frm-first"
                type="text"
                name="first"
                autoComplete="given-name"
                required
                onChange={(e) => { setFullname(e.target.value) }}
              />
            </div>
          </div>
          <div class={`${styles.subject} ${styles.block}`}>
            <label htmlFor="frm-subj">Subject</label>
            <input
              id="frm-subj"
              type="text"
              name="first"
              onChange={(e) => { setSubject(e.target.value) }}
            />
          </div>
          <div className={`${styles.message} ${styles.block}`}>
            <label htmlFor="frm-message">Message</label>
            <textarea id="frm-message" rows="4" name="message" onChange={(e) => { setMessage(e.target.value) }}></textarea>
          </div>
          <div className={`${styles.button}`}>
            <button type="submit">Submit</button>
          </div>
        </form>
      }

      {mailStatus === "sent" &&
        <div className={styles.container} ><div className={styles.afterText} >Message Sent</div></div>
      }

      {mailStatus === "failed" &&
        <div className={styles.container} ><div className={styles.afterText} >Message Failed To Send</div></div>
      }
    </>
  );
}