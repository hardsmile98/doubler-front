import { Link } from 'react-router-dom';
import Wallet from './Wallet';
import ThemeSwitcher from './ThemeSwitcher';
import MyBalance from './MyBalance';

function Header() {
  return (
    <div className='p-3 border-b-[0.5px] border-b-separator-light dark:border-b-separator-dark flex items-center justify-between flex-col gap-y-2 sm:flex-row'>
      <Link to='/'>
        <span className='text-sm font-semibold'>DOUBLER APP</span>
      </Link>

      <div className='shrink-0 flex items-center gap-3'>
        <MyBalance />

        <ThemeSwitcher />

        <Wallet />
      </div>
    </div>
  );
}

export default Header;
