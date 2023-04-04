import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import Head from "next/head";

import Content from "~/components/Content";

const Home: NextPage = () => {
  const {data: sessionData} = useSession();

  const head = <Head>
    <title>Notetaker</title>
    <meta name="description" content="Notetaker from https://www.youtube.com/watch?v=J1gzN1SAhyM&t=1314s" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;

  if (sessionData?.user) {
    return (
      <>
        {head}
        
        <Content />
      </>
    );
  }

  return (
    <div className=" lg:w-[27vw] w-[300px] h-fit text-5xl font-semibold text-white text-center">
      Please sign in if You want to use Notetaker
    </div>
  )
};

export default Home;
