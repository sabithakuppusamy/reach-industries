import React from "react";
import {
  faCodepen,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SocialMediaIcons = () => {
  return (
    <div className="flex gap-2 mt-2 cursor-pointer">
      <FontAwesomeIcon
        icon={faTwitter}
        onClick={() => {
          window.open("https://twitter.com/sabi95oct", "_blank");
        }}
        className="text-white w-5"
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        onClick={() => {
          window.open("https://codepen.io/sabitha_kuppusamy", "_blank");
        }}
        icon={faCodepen}
        className="text-white w-5"
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        onClick={() => {
          window.open(
            "https://www.linkedin.com/in/sabitha-kuppusamy-00748190/",
            "_blank"
          );
        }}
        icon={faLinkedin}
        className="text-white w-5"
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        icon={faGithub}
        onClick={() => {
          window.open("https://github.com/sabithakuppusamy", "_blank");
        }}
        className="text-white w-5"
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        onClick={() => {
          location.href = "mailto:sabi95oct@gmail.com";
        }}
        icon={faEnvelope}
        className="text-white w-5"
      ></FontAwesomeIcon>
    </div>
  );
};
