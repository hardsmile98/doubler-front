import LoseIcon from '@/assets/images/lose.svg?react';
import WinIcon from '@/assets/images/win.svg?react';
import useGetHistory from './useGetHistory';
import { Status } from '@/types';

const iconMap = {
  [Status.WIN]: WinIcon,
  [Status.LOSE]: LoseIcon,
};

const colorMap = {
  [Status.WIN]: 'text-success-light dark:text-success-dark',
  [Status.LOSE]: 'text-error-light dark:text-error-dark',
};

function History() {
  const { history, isLoading, isError } = useGetHistory({ limit: 10 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An error occurred while receiving transactions</div>;
  }

  return (
    <div className='flex flex-col gap-1'>
      {history?.map((game) => {
        const Icon = iconMap[game.status as Status];

        return (
          <div
            className='border-separator-light dark:border-separator-dark border rounded-xl p-3 flex items-center justify-between gap-2'
            key={game.id}
          >
            <div className='flex items-center gap-2 overflow-hidden'>
              <div>
                <Icon className={`${colorMap[game.status as Status]} w-[24px] h-[24px]`} />
              </div>

              <div className='text-label-secondary-light dark:text-label-secondary-dark whitespace-nowrap	overflow-ellipsis overflow-hidden'>
                {game.address}
              </div>
            </div>

            <div>{game.amount}</div>
          </div>
        );
      })}
    </div>
  );
}

export default History;
