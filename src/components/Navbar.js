import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavItem from "@/components/NavItem";
import { navLinks } from "@/components/config";


const Navbar = ({ toggleMobileNavbar }) => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const dynamicRoute = useRouter().asPath;

  useEffect(() => setActiveIdx(navLinks.findIndex((menu) => menu.url === dynamicRoute)), [dynamicRoute]); //Just in case

  return (
    <nav className={`nav`}>
      <div className={`${navActive ? "active" : ""} nav__menu-list`}>
        {navLinks.map(({ name, url, download }, i) => (
          <div className="nav__link"
            onClick={() => {
              if (!download) {
                setNavActive(false);
                setActiveIdx(i);
              }
              if (toggleMobileNavbar) {
                toggleMobileNavbar();
              }
            }}
            key={name}
          >
            <NavItem text={name} url={url} download={download} num={i} active={activeIdx === i} />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

