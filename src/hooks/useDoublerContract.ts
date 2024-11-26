import { Doubler } from '@/contracts/doubler';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract } from '@ton/core';
import { envs } from '@/constants';

function useDoublerContract() {
  const { sender } = useTonConnect();
  const client = useTonClient();

  const doublerContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = new Doubler(Address.parse(envs.contractAddress));

    return client.open(contract) as OpenedContract<Doubler>;
  }, [client]);

  return {
    address: doublerContract?.address?.toString(),
    sendBet: (value: bigint) => {
      return doublerContract?.sendBet(sender, value);
    },
  };
}

export default useDoublerContract;
