import React from "react";

import Hero from "../components/home/HomeHero";
import TextBlocks from "../components/home/TextBlocks";
import ImageText from "../components/home/ImageText";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <TextBlocks />
      <ImageText />
    </>
  );
};

export default Home;
