import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

export default function HomeContainer() {
  const history = useHistory();

  const page = useRef();

  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    // console.log(window.innerHeight, "window.innerHeight");
    // console.log(page.current.scrollHeight, "window.scrollHeight");

    const total = page.current.scrollHeight - window.innerHeight;
    const percent = (scrollPosition / total) * 100;
    setScrollPercent(percent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setScrollPercent(0);
    };
  }, [scrollPosition]);

  const handleGo = async () => {
    history.push("/profile");
  };

  useEffect(() => {
    if (scrollPercent === 100) {
      handleGo();
    }
  }, [scrollPercent]);

  return (
    <div className="loginpage h-[600vh]" ref={page}>
      <motion.div
        className=" bg-[#202124] loadingbox flex items-center justify-center"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        // exit={{ opacity: 1, background: "white" }}
        transition={{ duration: 2 }}
      >
        <div className="w-fit  fixed top-[-109px] left-[-24px] h-fit">
          <h1
            className="text-[270px]  "
            style={{
              width: `${scrollPercent}%`,
            }}
          >
            {parseInt(scrollPercent).toString().padStart(3, "0")}%
          </h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute top-[4rem] right-[5rem] text-white"
        >
          Scroll to see this website
        </motion.p>

        <motion.div
          initial={{ position: "absolute" }}
          exit={{ top: "0%", position: "absolute", paddingBottom: 300 }}
          transition={{ duration: 1 }}
          className="flex justify-between w-full bg-[#202124]"
        >
          <div className="w-[50%] flex h-1">
            <div
              className="bg-zinc-300"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
          <div className="w-[50%] h-1 flex flex-row-reverse">
            <div
              className="bg-zinc-300"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
