import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import SkillJumbo from "./SkillJumbo";

const Marquee = () => {
  const width = window.innerWidth;
  const marqueeVariants = {
    animate: {
      x: [0, -width],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 9,
          ease: "linear",
        },
      },
    },
  };
  return (
    <div>
      <div className="marquee">
        {/* 3. Using framer motion */}
        <motion.div
          className="track"
          variants={marqueeVariants}
          animate="animate"
        >
          <h1 className="text-[20px]">
            KEMAL ADITYA ZULFIKAR. KEMAL ADITYA ZULFIKAR. KEMAL ADITYA ZULFIKAR.
            KEMAL ADITYA ZULFIKAR. KEMAL ADITYA ZULFIKAR.
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

function Playground() {
  const ref = useRef(null); // once scroll stick in middle
  const { scrollYProgress, scrollXProgress } = useScroll();
  const [Data, setData] = useState([
    "brown",
    "red",
    "blue",
    "green",
    "emerald",
    "teal",
    "violet",
  ]);

  const scale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      {/* <div className="flex whitespace-nowrap overflow-x-scroll w-screen"> */}
      <motion.div className="progress-bar" style={{ width: scale }}>
        {scale}
      </motion.div>
      <Marquee />
      {/* {Data.map((r, i) => (
        <section
          key={i}
          style={{ background: r, opacity: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            // viewport={{ once: true }}
            viewport={{ root: ref }}
            className="w-[700px] h-[400px] bg-slate-500 text-[50px]"
          >
            hello world -{i}
          </motion.div>
        </section>
      ))} */}
      <Circle />
      {/* <ScrollTriggerTest /> */}
      <SkillJumbo />
    </div>
  );
}

function Circle() {
  const dot1 = useRef();
  const dot2 = useRef();
  const dot3 = useRef();

  useEffect(() => {
    console.log(dot1.current, dot2.current, dot3.current);
    gsap.to([dot1.current, dot2.current, dot3.current], {
      duration: 1,
      x: 100,
      ease: "power1.inOut,",
      stagger: { each: 0.5 },
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const handleZoom = () => {
    gsap.to([dot1.current, dot2.current, dot3.current], {
      //   duration: 2,
      width: 400,
      height: 400,
    });
  };

  return (
    <div className="">
      <div
        ref={dot1}
        onClick={handleZoom}
        className="w-[20px] h-[20px] bg-red-300 m-6 rounded-full"
      ></div>
      <div
        ref={dot2}
        className="w-[20px] h-[20px] bg-orange-300 m-6 rounded-full"
      ></div>
      <div
        ref={dot3}
        className="w-[20px] h-[20px] bg-violet-300 m-6 rounded-full"
      ></div>
    </div>
  );
}

function ScrollTriggerTest() {
  const redBox = useRef();
  const sectionRef = useRef();
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: redBox.current,
        start: "-50% center", ///80% from top screen [frombox/object, fromscreen]
        end: "150% center", /// 20% from top screen [frombox/object, fromscreen]
        scrub: true, // if false avoid scroller area, animation will be directly applied, and not go back if scroller end
        // pin: true,
        markers: true,
        // toggleActions: "play reverse play reverse", // [onenter, onleave, onenterBack, onleaveback], values are play, pause, reverse, complete
      },
    });
    tl.to(redBox.current, {
      duration: 1, //duration will affect if scrub is false
      opacity: 0.3,
      left: 400,
      //   width: 250,
      //   height: 250,
    }).to(redBox.current, {
      left: -400,
      opacity: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="h-[150vh] bg-slate-200 flex items-center" ref={sectionRef}>
      <div
        ref={redBox}
        className="w-[100px] h-[100px] bg-red-400 relative left-[-20px]"
      ></div>
    </div>
  );
}

export default Playground;
