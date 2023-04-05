import { Header } from '~/components/layout/Header';

type TLayoutProps = {
  children?: React.ReactNode;
}

const Layout: React.FC<TLayoutProps> = ({children}) => {
  return (
    <div className=' flex flex-col h-[100vh]'>
      <Header />

      <main className=' flex flex-grow justify-center items-center'>
        {children}
      </main>
    </div>
  );
}

export default Layout;