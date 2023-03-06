import React from "react";
//blocks
import { About, Clients, Hero, Team, Works } from "../../blocks";
import { ScrollToTop } from "../../hooks";

const Home = () => {
  return (
    <>
      <ScrollToTop />
      {/* <Intro /> */}
      <Hero />
      <About />
      <Clients />
      <Works />
      <Team />
    </>
  );
};

export default Home;
