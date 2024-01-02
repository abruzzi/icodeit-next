import { XIcon } from "react-share";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import React from "react";

const Footer = () => {
  return (
    <footer
      className={`flex flex-row my-4 items-center justify-center text-sm`}
    >
      <div className="mr-auto">&copy; 2023</div>

      <nav className="flex justify-center space-x-4 lg:mt-0 lg:ml-12 lg:items-center lg:space-x-4">
        <a href="https://twitter.com/JuntaoQiu" target="_blank" aria-label="My Twitter proflie">
          <XIcon size={20} round />
        </a>
        <a href="https://github.com/abruzzi" target="_blank" aria-label="My Github proflie">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/juntaoqiu/" target="_blank" aria-label="My LinkedIn proflie">
          <FaLinkedin size={20} />
        </a>
      </nav>
    </footer>
  );
};

export { Footer };
