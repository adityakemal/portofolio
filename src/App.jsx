import React, { useEffect } from "react";
import AnimatedCursor from "react-animated-cursor";
import { Switch, Route, useLocation } from "react-router-dom";
import About from "./components/About";
import { AnimatePresence } from "framer-motion";
import AnimateWrap from "./components/AnimateWrap";
import Playground from "./components/Playground";
import HomeContainer from "./pages/home/HomeContainer";
import ProfileContainer from "./pages/profile/ProfileContainer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        <ScrollToTop />
        <AnimatedCursor color="193, 11, 111" />
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <HomeContainer />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/profile">
            <ProfileContainer />
          </Route>
          <Route path="/play">
            <Playground />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}
