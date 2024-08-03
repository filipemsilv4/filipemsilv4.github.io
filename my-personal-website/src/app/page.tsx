import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import TerminalSection from '@/components/TerminalSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Paulo Filipe | Computer Science Student</title>
        <meta name="description" content="Paulo Filipe's portfolio - Computer Science student, bug squasher, and recursive acronym enthusiast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <TerminalSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;