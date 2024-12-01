import { useCallback, useEffect, useRef, useState } from 'react';
import { envs } from '@/constants';
import { useTonClient } from '@/hooks';
import { BetResult, Status } from '@/types';
import { Address, Transaction } from '@ton/core';
import { useTonWallet } from '@tonconnect/ui-react';
import { wait } from '@/helpers';
import { opCodes } from '@/contracts/doubler';

const limit = 10;

const intervalDuration = 10 * 1000;

const contractAddress = Address.parse(envs.contractAddress);

const useGetGame = () => {
  const [betResult, setBetResult] = useState<null | BetResult>(null);

  const wallet = useTonWallet();
  const myAddress = wallet && Address.parse(wallet.account.address);

  const startTimeRef = useRef(Math.round(Date.now() / 1_000));

  const client = useTonClient();

  const fetchTransactions = useCallback(async () => {
    if (!client) return;

    try {
      const transactions = await client.getTransactions(contractAddress, {
        limit,
        archival: true,
      });

      return transactions;
    } catch (e) {
      console.log('Error get transaction: ', e);

      await wait(1_000);

      return fetchTransactions();
    }
  }, [client]);

  const processTransaction = useCallback((transaction: Transaction, address: Address) => {
    const bodyInMessage = transaction.inMessage?.body;
    const sender = transaction.inMessage?.info.src;

    if (bodyInMessage && sender) {
      try {
        const ds = bodyInMessage.beginParse();
        const opCode = ds.loadUint(32);

        if (address.equals(sender as Address) && opCode === opCodes.bet) {
          setBetResult({
            status: transaction.outMessagesCount === 1 ? Status.WIN : Status.LOSE,
          });

          startTimeRef.current = transaction.now;
        }
      } catch (e) {
        console.log('Error parsing message body: ', e);
      }
    }
  }, []);

  const processTransactions = useCallback(
    async (address: Address) => {
      const transactions = await fetchTransactions();

      if (!transactions) {
        return;
      }

      for (const transaction of transactions) {
        if (transaction.now <= startTimeRef.current) {
          break;
        }

        processTransaction(transaction, address);
      }
    },
    [fetchTransactions, processTransaction],
  );

  useEffect(() => {
    if (!myAddress) return;

    const tick = async () => {
      await processTransactions(myAddress);
    };

    const intervalId = setInterval(tick, intervalDuration);

    tick();

    return () => clearInterval(intervalId);
  }, [myAddress, processTransactions]);

  return betResult;
};

export default useGetGame;
