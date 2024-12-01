import { useState } from 'react';
import TonIcon from '@/assets/images/ton.svg?react';
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useDoublerContract } from '@/hooks';
import { toNano } from '@ton/core';

const defaultBets = ['0.1', '0.2', '0.5', '1'];

function Bet() {
  const [amount, setAmount] = useState('0.1');

  const wallet = useTonWallet();

  const [tonConnectUI] = useTonConnectUI();

  const { sendBet } = useDoublerContract();

  const handleBet = () => {
    if (!wallet) {
      tonConnectUI.openModal();

      return;
    }

    sendBet(toNano(amount), 1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='mb-3'>
        <p className='text-label-secondary-light dark:text-label-secondary-dark mb-1'>Bet amount</p>

        <div className='relative'>
          <TonIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-[24px] h-[24px]' />

          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='0.1'
            className='w-[100%] h-[50px] pl-[48px] bg-bg-primary-light dark:bg-bg-primary-dark rounded-xl p-3'
          />
        </div>

        <p className='mt-1 text-[12px] text-label-secondary-light dark:text-label-secondary-dark mb-1'>
          Min amount: 0.1 TON
        </p>
      </div>

      <div className='flex gap-2 mb-3'>
        {defaultBets.map((bet) => (
          <button
            className={`${amount === bet ? 'text-black dark:text-white border-primary-light dark:border-white' : 'text-label-secondary-light dark:text-label-secondary-dark border-separator-light dark:border-separator-dark'} w-[100%] h-[60px] font-semibold border rounded-xl p-3`}
            onClick={() => setAmount(bet)}
            key={bet}
          >
            {bet}
          </button>
        ))}
      </div>

      <button
        disabled={+amount < 0.1}
        onClick={handleBet}
        className='w-[100%] h-[50px] bg-primary-light dark:bg-primary-dark text-white font-semibold p-3 rounded-xl disabled:grayscale disabled:cursor-not-allowed'
      >
        Make bet
      </button>
    </form>
  );
}

export default Bet;
