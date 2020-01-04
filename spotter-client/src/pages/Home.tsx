import React from "react";

import Hero from "../components/home/HomeHero";
import TextBlocks from "../components/home/TextBlocks";
import ImageText from "../components/home/ImageText";
import Features from "src/components/home/Features";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TextBlocks />
      <ImageText />
      <Features />
    </>
  );
};

export default Home;
