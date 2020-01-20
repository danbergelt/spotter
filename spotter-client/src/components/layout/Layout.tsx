import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

interface Props {
  children: any; // eslint-disable-line
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
