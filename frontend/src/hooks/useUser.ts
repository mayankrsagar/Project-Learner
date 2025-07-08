import useSWR from 'swr';

import { fetchMe } from '../api/userApi';

export const useUser = () => {
  const { data, error } = useSWR('me', fetchMe);
  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  };
};