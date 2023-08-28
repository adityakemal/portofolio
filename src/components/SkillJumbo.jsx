import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SkillJumbo() {
  const circleRef = useRef();
  const circleParent = useRef();
  const nameRef = useRef();
  const nameRef2 = useRef();

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: circleRef.current,
        start: "center center",
        end: `${circleParent.current.clientHeight - 1000} center`,
        markers: true,
        scrub: true,
        toggleActions: "play reverse play reverse", // [onenter, onleave, onenterBack, onleaveback], values are play, pause, reverse, complete
      },
    });

    tl.to(circleRef.current, {
      duration: 1, //duration will affect if scrub is false
      //   opacity: 0.6,
      scale: window.innerWidth + 300,
      position: "fixed",
    })
      .to(nameRef.current, {
        left: "50%",
        //   position: "fixed",
      })
      .to(nameRef2.current, {
        right: "50%",
        //   position: "fixed",
      });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    console.log(
      circleParent.current.scrollHeight,
      "circleParent.current.innerHeight"
    );
  }, []);

  return (
    <>
      <div
        className="h-[400vh] bg-gray-200 w-full flex relative "
        ref={circleParent}
      >
        <div
          ref={circleRef}
          className="bg-red-400 h-[1px] w-[1px] absolute float-middle  rounded-full"
          style={{
            top: window.innerHeight / 2,
            left: window.innerWidth / 2,
            //   marginTop: "-50px",
            //   marginRight: "-50px",
          }}
        ></div>
        <h1
          ref={nameRef}
          className="text-[100px] fixed text-gray-200"
          style={{
            left: -window.innerWidth / 2,
          }}
        >
          TEXT HERE
        </h1>
        <h1
          ref={nameRef2}
          className="text-[150px] fixed text-gray-200"
          style={{
            right: -window.innerWidth / 2,
            top: "30%",
          }}
        >
          Kemal Aditya
        </h1>
      </div>
      <div className="h-screen border bg-red-400">dfsfsaaf</div>
    </>
  );
}
