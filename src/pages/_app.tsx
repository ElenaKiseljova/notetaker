import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import { TopicContextProvider } from "~/store/topic";

import "~/styles/globals.css";

import Layout from "~/components/layout/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <TopicContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>    
      </TopicContextProvider>        
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
