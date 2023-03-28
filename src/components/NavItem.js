import Link from "next/link";
import React from "react";


const NavItem = ({ num, text, url, download, active }) => {

  if (download) {
    return (
      <a download={true} href={download}
        className={`nav__item`}
      >
        <span className='nav__num'>{num}. </span>{text}
      </a>
    );
  }
  return (
    <Link href={url}
      className={`nav__item ${active ? "active" : ""
        }`}
    >
      <span className='nav__num'>{num}. </span>{text}
    </Link>
  );
};

export default NavItem;