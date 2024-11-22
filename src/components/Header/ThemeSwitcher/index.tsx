import { useTelegram } from '@/hooks';
import { useDispatch, useSelector } from '@/store';
import { setTheme } from '@/store/slices/user';
import MoonIcon from '@/assets/images/moon.svg?react';
import SunIcon from '@/assets/images/sun.svg?react';

function ThemeSwitcher() {
  const dispatch = useDispatch();

  const { tg } = useTelegram();

  const theme = useSelector((state) => state.user.theme);

  const changeTheme = (newTheme: string) => {
    tg.HapticFeedback.impactOccurred('light');

    dispatch(setTheme(newTheme));
  };

  return (
    <div className='bg-bg-secondary-light dark:bg-black rounded-full flex items-center p-1'>
      <button
        disabled={theme === 'light'}
        onClick={() => changeTheme('light')}
        className={`p-1.5 rounded-full cursor-pointer transition-colors ${theme === 'light' ? 'text-black dark:text-white bg-white dark:bg-bg-secondary-dark shadow-sm' : 'text-label-secondary-light dark:text-label-secondary-dark'}`}
      >
        <SunIcon className='w-5 h-5' />
      </button>

      <button
        disabled={theme === 'dark'}
        onClick={() => changeTheme('dark')}
        className={`p-1.5 rounded-full cursor-pointer transition-colors ${theme === 'dark' ? 'text-black dark:text-white bg-white dark:bg-bg-secondary-dark shadow-sm' : 'text-label-secondary-light dark:text-label-secondary-dark'}`}
      >
        <MoonIcon className='w-5 h-5' />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
