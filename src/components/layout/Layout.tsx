import { Header } from '~/components/layout/Header';

type TLayoutProps = {
  children?: React.ReactNode;
}

const Layout: React.FC<TLayoutProps> = ({children}) => {
  return (
    <>
      <Header />

      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;