import { fetcher } from '../utils/fetcher';
import useSWR from 'swr';

const useShippingDetail = (labelId: string) => {
  const { data, isLoading, error } = useSWR(
    `http://localhost:8080/shippingData/${labelId}`,
    fetcher
  );

   return {
     shippingDetail: data,
     isLoading, 
     error,
   };
};

export default useShippingDetail;
