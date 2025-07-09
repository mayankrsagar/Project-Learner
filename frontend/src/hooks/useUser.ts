import useSWR from 'swr';

import { fetchMe } from '../api/userApi';

export const useUser = () => {
  const { data, error } = useSWR('me', fetchMe, {
    errorRetryCount: 1,
    errorRetryInterval: 5000,
    shouldRetryOnError: (err) => {
      // Don't retry on 401 (unauthorized) or 404 (not found)
      if (err.message.includes('401') || err.message.includes('404')) {
        return false;
      }
      return true;
    },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    user: data?.user,
    isLoading: !error && !data,
    isError: error,
  };
};
