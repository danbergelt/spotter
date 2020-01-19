import React from 'react';
import { Helmet } from 'react-helmet-async';
import Features from '../components/home/Features';
import BottomCta from '../components/home/BottomCta';
import Hero from '../components/home/HomeHero';
import TextBlocks from '../components/home/TextBlocks';
import ImageText from '../components/home/ImageText';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Spotter</title>
      </Helmet>
      <Hero />
      <TextBlocks />
      <ImageText />
      <Features />
      <BottomCta />
    </>
  );
};

export default Home;
