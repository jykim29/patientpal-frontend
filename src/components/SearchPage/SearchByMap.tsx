import React from 'react';
import MainTitleIndex from '../Home/MainTitleIndex';
import MapHeader from './MapHeader';
import Map from './Map';

function SearchByMap() {
  return (
    <div className="w-full">
      <MainTitleIndex size="small" text="지도로 찾기">
        <section className="flex h-[762px] flex-col rounded-[15px] shadow-sm">
          <MapHeader />
          <Map />
        </section>
      </MainTitleIndex>
    </div>
  );
}

export default SearchByMap;
