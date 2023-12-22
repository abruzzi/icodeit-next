import { XIcon } from "react-share";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={`flex flex-row my-4 items-center justify-center text-sm`}
    >
      <div className="mr-auto">&copy; 2023</div>

      <nav className="flex justify-center space-x-10 lg:mt-0 lg:ml-12 lg:items-center lg:space-x-6">
        <a href="https://twitter.com/JuntaoQiu" target="_blank">
          <XIcon size={20} round />
        </a>
        <a href="https://github.com/abruzzi" target="_blank">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/juntaoqiu/" target="_blank">
          <FaLinkedin size={20} />
        </a>
      </nav>
    </footer>
  );
};

export { Footer };
