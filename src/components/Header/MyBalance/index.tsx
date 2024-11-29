import { useTonClient, useTonConnect } from '@/hooks';
import { Address, fromNano } from '@ton/core';
import { useCallback, useEffect, useRef, useState } from 'react';

function MyBalance() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [balance, setBalance] = useState<null | string>(null);
  const [isLoading, setLoading] = useState(true);

  const client = useTonClient();
  const { address } = useTonConnect();

  const getBalance = useCallback(async () => {
    if (!address) {
      return;
    }

    const value = await client?.getBalance(Address.parse(address));

    if (value) {
      const ton = +fromNano(value);

      setBalance(ton.toFixed(2));

      setLoading(false);
    }
  }, [client, address]);

  useEffect(() => {
    getBalance();

    intervalRef.current = setInterval(() => getBalance(), 10_000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [getBalance]);

  return (
    <div className='text-sm'>
      <p className='font-semibold'>Balance:</p>

      <p className='text-label-secondary-light dark:text-label-secondary-dark flex items-center gap-1'>
        {isLoading ? (
          <span className='bg-bg-secondary-light dark:bg-bg-secondary-dark animate-pulse rounded-sm inline-block h-[16px] w-[40px]'></span>
        ) : (
          <span>{balance}</span>
        )}
        TON
      </p>
    </div>
  );
}

export default MyBalance;
