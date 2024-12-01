import { useCallback, useEffect, useState } from 'react';
import { envs } from '@/constants';
import { opCodes } from '@/contracts/doubler';
import { useTonClient } from '@/hooks';
import { Address, fromNano, Transaction } from '@ton/core';
import { Status, type Game } from '@/types';

/**
 * Hook for getting game history
 * @param limit - number of games
 */
const useGetHistory = ({ limit }: { limit: number }) => {
  const [history, setHistory] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const client = useTonClient();

  /**
   * Formatting a transaction into a game format
   */
  const formatTransaction = useCallback((tx: Transaction) => {
    const address = tx.inMessage?.info.src?.toString() || '-';
    const amount =
      tx.inMessage && 'value' in tx.inMessage.info ? fromNano(tx.inMessage.info.value.coins) : '-';
    const status = tx.outMessagesCount === 1 ? Status.WIN : Status.LOSE;

    return {
      id: tx.hash().toString('hex'),
      address,
      amount,
      status,
    };
  }, []);

  /**
   * Transaction filtering and processing
   */
  const filterTransactions = useCallback((txs: Transaction[]) => {
    return txs.filter((tx) => {
      try {
        const bodyInMessage = tx.inMessage?.body;
        const ds = bodyInMessage?.beginParse();
        const opCode = ds?.loadUint(32);

        return opCode === opCodes.bet;
      } catch (error) {
        console.error('Error parsing message body:', error);
        return false;
      }
    });
  }, []);

  /**
   * Loading transaction history
   */
  const getHistoryTxs = useCallback(async () => {
    if (!client) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const txs = await client.getTransactions(Address.parse(envs.contractAddress), {
        limit,
        archival: true,
      });

      const filtered = filterTransactions(txs);

      const formatted = filtered.map(formatTransaction);

      setHistory(formatted);
    } catch (error) {
      console.error('Error while receiving transactions:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [client, limit, filterTransactions, formatTransaction]);

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
