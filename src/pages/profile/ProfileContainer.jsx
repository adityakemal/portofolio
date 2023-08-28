import { ScrollTrigger, gsap } from "gsap/all";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

export default function ProfileContainer() {
  const profileRef = useRef();
  const myjobRef = useRef();
  const redBox = useRef();
  const letterRef = useRef();

  useEffect(() => {
    const sections = gsap.utils.toArray(".panel");
    let maxWidth = 0;
    sections.forEach((section) => {
      maxWidth += section.offsetWidth;
    });

    let slideContainerAnim = gsap.to(sections, {
      x: () => `-${maxWidth - window.innerWidth}`,
      ease: "none",
      scrollTrigger: {
        trigger: profileRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${maxWidth}`,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });
    const letter = gsap.utils.toArray(".letter");

    gsap.to(letter, {
      marginTop: 0,
      marginBottom: 0,
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: redBox.current,
        containerAnimation: slideContainerAnim,
        start: `left 70%`, ///80% from top screen [frombox/object, fromscreen]
        end: "right center",
        scrub: true, // if false avoid scroller area, animation will be directly applied, and not go back if scroller end
        // pin: true,
        horizontal: true,
        pinSpacing: false,
        // markers: true,
        // toggleActions: "play reverse play reverse", // [onenter, onleave, onenterBack, onleaveback], values are play, pause, reverse, complete
      },
    });

    return () => {
      slideContainerAnim.kill();
    };
  }, []);

  const myjobArr = [
    "i",
    "s ",
    "a ",
    "f",
    "r",
    "o",
    "n",
    "t",
    "-",
    "e",
    "n",
    "d ",
    "d",
    "e",
    "v",
    "e",
    "l",
    "o",
    "p",
    "e",
    "r",
  ];
  console.log(myjobArr);

  return (
    <>
      {/* <div className=" h-screen w-screen bg-zink-500"></div> */}

      <motion.div
        className="top-0 left-0 right-0 h-[60px] fixed flex items-center justify-between  z-10 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p>Menu</p>
        <p>Menu</p>
      </motion.div>
      <div className="flex w-fit flex-nowrap" ref={profileRef}>
        <div className="w-screen">
          <div
            className="panel h-screen w-screen bg-zinc-100 flex justify-center items-center"
            //  className="h-screen w-screen bg-[#8FA1A5] flex items-center justify-center"
            initial={{ height: "0vh", overflow: "hidden" }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ x: "100%" }}
            transition={{ duration: 2 }}
          >
            <div style={{ lineHeight: "13rem" }}>
              <h1 className="text-[12.5vw] text-zinc-400">Kemal Aditya </h1>
              <h1 className="text-[12.5vw] text-zinc-400">Zulfikar👨‍💻 </h1>
            </div>
          </div>
        </div>
        <div
          className="panel h-screen w-[180vw] bg-zinc-100 flex justify-center items-center "
          ref={myjobRef}
        >
          <div
            className=" flex items-center h-fit relative wrapmyjob "
            ref={redBox}
          >
            {myjobArr?.map((res, i) => (
              <div
                key={i}
                ref={letterRef}
                className="text-[14vw] letter text-zinc-400 "
                style={{
                  position: "relative",
                  opacity: 0,
                  // margin: (i + 2) % 2 === 0 && `20px 0 0 20px`,
                }}
              >
                {res.includes(" ") ? <div className="mr-7">{res}</div> : res}
              </div>
            ))}
          </div>
        </div>
        <div className="panel h-screen w-screen bg-slate-400"></div>
      </div>
      <div className=" h-screen w-screen bg-violet-500"></div>
    </>
  );
}
