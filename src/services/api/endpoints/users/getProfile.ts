import { IUser } from '@/types';

type GetProfileResponse = {
  status: number;
  data: {
    user: IUser;
    isMyProfile: boolean;
    position: number;
  };
};

const getProfile = {
  query: ({ userId }: { userId?: string }) => ({
    url: '/user/profile',
    method: 'GET',
    params: {
      userId: userId ?? undefined,
    },
  }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
};

export { getProfile, type GetProfileResponse };
