import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SkillJumbo from "./SkillJumbo";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const history = useHistory();
  const component = useRef();
  const slider = useRef();

  const handleGoHome = async () => {
    await history.push("/");
  };

  // useLayoutEffect(() => {
  //   console.log(slider.current.offsetWidth);
  //   let ctx = gsap.context(() => {
  //     let panels = gsap.utils.toArray(".panel");
  //     gsap.to(panels, {
  //       xPercent: -100 * (panels.length - 1),
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: slider.current,
  //         pin: true,
  //         scrub: 1,
  //         snap: 1 / (panels.length - 1),
  //         end: () => "+=" + slider.current.offsetWidth,
  //         markers: true,
  //       },
  //     });
  //   }, component);
  //   return () => ctx.revert();
  // });

  const skills = ["JavaScript", "SCSS", "Exress", "NextJS", "ReactJS", "VueJS"];
  useEffect(() => {
    let cards = gsap.utils.toArray(".cardpanel");

    let to = gsap.to(cards, {
      xPercent: () => -100 * (cards.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: slider.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,

        end: () => "+=" + window.innerWidth,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <div
      ref={component}
      className="about overflow-x-hidden bg-[#202124]"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
    >
      <div className="h-screen w-screen flex justify-center  bg-[#202124] ">
        <motion.div
          className="h-screen w-screen bg-[#8FA1A5] flex items-center justify-center"
          initial={{ height: "1vh", overflow: "hidden", opacity: 0 }}
          animate={{ height: "100vh", opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="" style={{ lineHeight: "" }}>
            <h1 className="text-[200px] text-[#E8E7CB]">FRONT-END DEV.</h1>
            <div className="flex items-center">
              <h1 className="text-[#E8E7CB] text-[200px]">LIVING IN</h1>
              <span className="country ml-6">
                <h2 className="text-red-800 text-[90px] m-0">INDONESIA</h2>
                <h2 className="text-white text-[90px] m-0">BANDUNG.</h2>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* <SkillJumbo /> */}
      {/* <div className="h-screen w-screen bg-zinc-400 flex items-center justify-center">
        ksksksk
      </div> */}
      {/* <motion.div
        ref={slider}
        className="flex w-fit overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="h-screen w-screen panel bg-yellow-400 flex items-center justify-center ">
          <div className=" text-[200px]">scroll</div>
        </div>
        <div className="h-screen w-screen panel bg-slate-400">
          <h1>ONE</h1>
        </div>
        <div className="h-screen w-screen panel bg-blue-400">
          <h1>TWO</h1>
        </div>
        <div className="h-screen w-screen panel bg-violet-400">THREE</div>
      </motion.div> */}

      <div className="flex  items-center h-fit  justify-between " ref={slider}>
        {skills.map((item, i) => (
          <div
            className={` cardpanel w-full relative min-w-[70vw] h-[100vh] flex items-center  justify-center bg-white border mr-[6%]`}
            key={i}
          >
            <div className="flex items-center justify-center w-[95%] overflow-hidden relative h-[25vw] bg-[#3eb681] text-white rounded-full ">
              <h1 className="text-[10rem] absolute top-[-30px] left-12">
                {item}
              </h1>
              <p className="text-white">{item}</p>
            </div>
          </div>
        ))}
      </div>
      <motion.div
        className="h-screen w-screen bg-green-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Last Container
        <br />
        <br />
        <br />
        <br />
        <br />
        <ul>
          <li>
            <button onClick={handleGoHome}>HOME</button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
