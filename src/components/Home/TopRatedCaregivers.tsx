import { useEffect, useState } from 'react';
import { GetTopRatedCaregiversResponse } from '@/types/api/review';
import { useAuthStore } from '@/store/useAuthStore';
import { reviewService } from '@/services';
import { API_FAILED } from '@/constants/api';
import Card from './Card';

function TopRatedCaregivers() {
  const [data, setData] = useState<GetTopRatedCaregiversResponse>([]);
  const { user } = useAuthStore();

  useEffect(() => {
    const getTopRatedCaregivers = async () => {
      const myRegion = user?.address ? user.address.addr.split(' ')[0] : '서울';
      const response = await reviewService.getTopRatedCaregiver(myRegion);
      if (response.status === API_FAILED) return;
      const sortedData = [...response.data].sort((a, b) => b.rating - a.rating);
      const slicedData = sortedData.slice(0, 3);
      return setData(slicedData);
    };
    getTopRatedCaregivers();
  }, []);

  return (
    <>
      {data.map((item, index) => {
        return (
          <Card.Rank
            key={item.id}
            index={index}
            name={item.name}
            address={item.address.split(' ').slice(0, 2).join(' ')}
          />
        );
      })}
    </>
  );
}

export default TopRatedCaregivers;
