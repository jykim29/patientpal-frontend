import { useState } from 'react';
import MainTitleIndex from '../Home/MainTitleIndex';
import SearchForm from './SearchForm';

function SearchByCity() {
  const [currentLocation, setCurrentLocation] = useState('서울 강남구');
  const location = [
    '서울',
    '서울 강남구',
    '서울 강동구',
    '서울 강북구',
    '서울 강서구',
    '서울 관악구',
    '서울 광진구',
    '서울 구로구',
    '서울 금천구',
    '서울 노원구',
    '서울 도봉구',
    '서울 동대문구',
    '서울 동작구',
    '서울 마포구',
    '서울 서대문구',
    '서울 서초구',
    '서울 성동구',
    '서울 성북구',
    '서울 송파구',
    '서울 양천구',
    '서울 영등포구',
    '서울 용산구',
    '서울 은평구',
    '서울 종로구',
    '서울 중구',
    '서울 중랑구',
  ];

  const locationList = location.map((title, index) => ({
    index,
    title,
  }));

  const currentImg = locationList.find(
    (location) => location.title === currentLocation
  );

  return (
    <MainTitleIndex size="small" text="지역별 찾기">
      <div className="flex h-[565px] w-full rounded-[15px] border-[1.5px] shadow-lg">
        {currentImg && (
          <img
            key={currentImg.index}
            alt={currentImg.title}
            src={`/assets/images/seoul/map_${currentImg.index}.png`}
            className="w-[696px]"
          />
        )}

        <SearchForm setCurrentLocation={setCurrentLocation} />
      </div>
    </MainTitleIndex>
  );
}

export default SearchByCity;
