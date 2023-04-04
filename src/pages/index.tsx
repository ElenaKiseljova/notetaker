import { type NextPage } from "next";

import Head from "next/head";

import Content from "~/components/Content";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Notetaker</title>
        <meta name="description" content="Notetaker from https://www.youtube.com/watch?v=J1gzN1SAhyM&t=1314s" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Content />
    </>
  );
};

export default Home;
