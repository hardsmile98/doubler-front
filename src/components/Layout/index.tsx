import { ReactNode } from 'react';
import Header from '../Header';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div
      className={`flex flex-col h-[100%] transition-height bg-bg-primary-light text-black dark:bg-bg-primary-dark dark:text-white`}
    >
      <Header />

      <div className='grow overflow-y-auto p-3'>{children}</div>
    </div>
  );
}

export default Layout;
