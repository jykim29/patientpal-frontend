import React, { useEffect } from 'react';
const { kakao } = window;

function Map({ searchResult }) {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 기본 중심 위치를 내 프로필의 주소로 넣으면 어떨까?
      level: 6,
    };
    const map = new kakao.maps.Map(container, options);
    searchResult.forEach((item) => {
      const address = item.address.addr;
      const name = item.name;
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          console.log(marker);
          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`,
          });
          infowindow.open(map, marker);

          // 지도 중심을 마지막 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        } else {
          console.log('주소에러');
        }
      });
    });
  }, [searchResult]);

  return <div id="map" className="h-full w-full"></div>;
}

export default Map;
