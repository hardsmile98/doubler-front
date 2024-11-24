import { useState } from 'react';
import Bet from './Bet';
import History from './History';

enum Tab {
  BET = 'bet',
  HISTORY = 'history',
}

const tabs = {
  [Tab.BET]: {
    label: 'Bet',
  },
  [Tab.HISTORY]: {
    label: 'History',
  },
};

function Tabs() {
  const [tab, setTab] = useState(Tab.BET);

  return (
    <div className='min-h-[320px] p-3 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl flex flex-col'>
      <ul className='flex items-center mb-4'>
        {Object.keys(tabs).map((key) => (
          <li className='grow' key={key}>
            <button
              className={`${tab === key ? 'text-black dark:text-white border-b-primary-light dark:border-b-primary-dark' : 'border-b-separator-light dark:border-b-separator-dark  text-label-secondary-light dark:text-label-secondary-dark'} border-b-[1px] p-2 w-[100%] text-center`}
              onClick={() => setTab(key as Tab)}
            >
              {tabs[key as Tab].label}
            </button>
          </li>
        ))}
      </ul>

      <div className='grow'>
        {tab === Tab.BET && <Bet />}

        {tab === Tab.HISTORY && <History />}
      </div>
    </div>
  );
}

export default Tabs;
