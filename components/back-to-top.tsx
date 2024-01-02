"use client";

import { useEffect } from "react";
import {
  motion,
  useAnimationControls,
  useScroll,
  Variants,
} from "framer-motion";
import { BiUpArrowAlt } from "react-icons/bi";

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const BackToTop = () => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
    return scrollYProgress.on("change", (latestValue: number) => {
      if (latestValue > 0.3) {
        controls.start("show");
      } else {
        controls.start("hide");
      }
    });
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      className={`fixed bottom-10 right-10 text-white w-8 h-8 rounded-full bg-brand flex items-center justify-center text-xs`}
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <BiUpArrowAlt size={16} />
    </motion.button>
  );
};

export { BackToTop };
