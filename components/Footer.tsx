import React from "react";
import { SocialMediaIcons } from "./SocialMediaIcons";

const Footer = () => {
  return (
    <footer className=" flex flex-col fixed bottom-0 h-[8vh] w-full items-center justify-center">
      <div className="my-4 flex flex-col items-center justify-center">
        <div className=" flex items-center justify-center gap-2 text-white text-center font-thin">
          Developed by Sabitha Kuppusamy
        </div>
        <SocialMediaIcons />
      </div>
    </footer>
  );
};

export default Footer;
