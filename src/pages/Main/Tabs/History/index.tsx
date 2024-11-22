import LoseIcon from '@/assets/images/lose.svg?react';
import PendingIcon from '@/assets/images/spinner.svg?react';
import WinIcon from '@/assets/images/win.svg?react';

const games = [
  {
    id: 1,
    address: 'EQDC7Zy5VrvjHHLH3U-OR60NcQYpLql6k3V9eYhGsYvt1dnH',
    amount: 0.1,
    status: 'pending',
  },
  {
    id: 2,
    address: 'EQDC7Zy5VrvjHHLH3U-OR60NcQYpLql6k3V9eYhGsYvt1dnH',
    amount: 0.1,
    status: 'win',
  },
  {
    id: 3,
    address: 'EQDC7Zy5VrvjHHLH3U-OR60NcQYpLql6k3V9eYhGsYvt1dnH',
    amount: 0.1,
    status: 'lose',
  },
];

enum Status {
  PENDING = 'pending',
  WIN = 'win',
  LOSE = 'lose',
}

const iconMap = {
  [Status.PENDING]: PendingIcon,
  [Status.WIN]: WinIcon,
  [Status.LOSE]: LoseIcon,
};

const colorMap = {
  [Status.PENDING]: '',
  [Status.WIN]: 'text-success-light dark:text-success-dark',
  [Status.LOSE]: 'text-error-light dark:text-error-dark',
};

function History() {
  return (
    <div className='flex flex-col gap-1'>
      {games.map((game) => {
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
