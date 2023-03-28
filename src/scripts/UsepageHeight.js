import React, { useEffect } from "react";

export default function UsepageHeight() {
  useEffect(function mount() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      return function unMount() {
        window.removeEventListener("resize", () => { });
      };
    });
  }, []);

  return null;
}