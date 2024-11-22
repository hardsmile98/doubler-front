import { IGift, IUser } from '@/types';

type GetOrdersReceivedResponse = {
  status: number;
  data: Array<{
    _id: string;
    giftId: IGift;
    status: 'sent';
    purchaseDate: string;
    userId: IUser;
    sendDate: string;
    recipientId: string;
    paymentId: string;
  }>;
};

const getOrdersReceived = {
  query: ({ userId }: { userId?: string }) => ({
    url: '/order/received',
    method: 'GET',
    params: {
      userId: userId ?? undefined,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getOrdersReceived, type GetOrdersReceivedResponse };
