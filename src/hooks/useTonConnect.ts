import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from '@ton/core';

export function useTonConnect(): { sender: Sender; address: string | null; connected: boolean } {
  const [tonConnectUI] = useTonConnectUI();

  const wallet = useTonWallet();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    address: tonConnectUI.wallet && tonConnectUI.wallet.account.address,
    connected: !!wallet,
  };
}
