import { useSession } from 'next-auth/react';
import { Header } from '~/components/layout/Header';

type TLayoutProps = {
  children?: React.ReactNode;
}

const Layout: React.FC<TLayoutProps> = ({children}) => {
  const {data: sessionData} = useSession();

  return (
    <div className={` flex flex-col h-[100vh] ${
      sessionData?.user ? '' : 'bg-[url("/img/note-paper-1236797.jpg")] bg-[length:98vw_auto] lg:bg-[length:auto_80vh] bg-no-repeat bg-center'
    }`}>
      <Header />

      <main className=' flex flex-grow justify-center items-center'>
        {children}
      </main>
    </div>
  );
}

export default Layout;