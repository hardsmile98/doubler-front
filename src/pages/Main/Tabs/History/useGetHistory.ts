import { envs } from '@/constants';
import { opCodes } from '@/contracts/doubler';
import { useTonClient } from '@/hooks';
import { Address, fromNano } from '@ton/core';
import { useCallback, useEffect, useState } from 'react';
import { Status, type Game } from '@/types';

const useGetHistory = ({ limit }: { limit: number }) => {
  const [history, setHistory] = useState<Game[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const client = useTonClient();

  const getHistoryTxs = useCallback(async () => {
    try {
      setLoading(true);

      const txs = await client?.getTransactions(Address.parse(envs.contractAddress), {
        limit,
      });

      const filtered = txs?.filter((tx) => {
        try {
          const bodyInMessage = tx.inMessage?.body;

          const ds = bodyInMessage?.beginParse();

          const opCode = ds?.loadUint(32);

          return opCode === opCodes.bet;
        } catch (e) {
          console.log('Error parsing message body: ', e);
        }
      });

      const formatted = (filtered || []).map((tx) => ({
        id: tx.hash().toString('hex'),
        address: tx.inMessage?.info.src?.toString() || '-',
        amount:
          tx.inMessage && 'value' in tx.inMessage?.info
            ? fromNano(tx.inMessage.info.value.coins)
            : '-',
        status: tx.outMessagesCount === 1 ? Status.WIN : Status.LOSE,
      }));

      setHistory(formatted);

      setLoading(false);
    } catch (e) {
      console.log('Error get transactions: ', e);

      setLoading(false);
      setError(true);
    }
  }, [limit, client]);

  useEffect(() => {
    getHistoryTxs();
  }, [getHistoryTxs]);

  return {
    history,
    isLoading,
    isError,
  };
};

export default useGetHistory;
