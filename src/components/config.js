import Github from "./images/github.svg";
import Linkedin from "./images/linkedin.svg";
import Email from "./images/email.svg";

module.exports = {
  email: 'mailto: kadirtbk@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/jeduf',
      data: Github,
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/kadir-tabak-b49108214/',
      data: Linkedin,
    },
    {
      name: 'Email',
      url: 'mailto: kadirtbk@gmail.com',
      data: Email,
    },
  ],
  navLinks: [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'About',
      url: '/about',
    },
    {
      name: 'Experience',
      url: '/experience',
    },
    {
      name: 'Works',
      url: '/works',
    },
    {
      name: 'Contact',
      url: '/contact',
    },
    {
      name: 'Resume',
      url: '/',
      download: 'Kadir Tabak Resume.pdf'
    }
  ]
};