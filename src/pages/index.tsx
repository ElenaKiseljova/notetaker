import { type NextPage } from "next";
import { useSession } from "next-auth/react";

import Head from "next/head";

import Content from "~/components/Content";

const Home: NextPage = () => {
  const {data: sessionData} = useSession();

  const head = <Head>
    <title>Notetaker</title>
    <meta name="description" content="Notetaker from https://www.youtube.com/watch?v=J1gzN1SAhyM&t=1314s" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
    <>
      {head}

      <div className="flex items-center justify-center text-center w-[790px] max-w-[90vw] h-[70vh] bg-[url('/img/note-paper-1236797.jpg')] bg-no-repeat bg-center bg-contain">
        <span className=" w-80 max-w-[60%] p-2 text-2xl sm:text-3xl md:text-4xl text-white font-semibold -skew-y-6 skew-x-6">Please sign in if You want to use Notetaker</span>
      </div>
    </>    
  )
};

export default Home;
