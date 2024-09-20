import { useEffect, useState } from 'react';
import { UserList } from '@/types/searchResult.model';
import { useAuthStore } from '@/store/useAuthStore';
const { kakao }: any = window;

interface MapProps {
  searchResult: Partial<UserList>[];
}

function Map({ searchResult }: MapProps) {
  const { user }: any = useAuthStore();
  const userAddress = user?.address.addr;
  const [userLocation, setUserLocation] = useState<any | null>(null);
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(userAddress, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const location = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(location);
        setUserLocation(location);
      } else {
        console.log('사용자 위치 검색 실패');
      }
    });
  }, [user?.address]);

  useEffect(() => {
    let center;
    if (!userLocation) {
      center = new kakao.maps.LatLng(37.5665, 126.978);
    } else {
      center = userLocation;
    }

    const container = document.getElementById('map');
    const geocoder = new kakao.maps.services.Geocoder();

    const options = {
      center: center, // 기본 중심 위치를 내 프로필의 주소로 넣으면 어떨까?
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      imageSize = new kakao.maps.Size(24, 35),
      imageOption = { offset: new kakao.maps.Point(15, 10) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    if (userLocation) {
      new kakao.maps.Marker({
        map: map,
        position: userLocation,
        image: markerImage,
        zIndex: -1,
      });
    }

    searchResult.forEach((item) => {
      // address가 존재하는지 확인
      if (item.address && item.address.addr) {
        const address = item.address.addr;
        const name = item.name || '이름 없음'; // 이름이 없는 경우 기본값 설정

        geocoder.addressSearch(address, function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });

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
      } else {
        console.log('주소 정보가 없습니다');
      }
    });
  }, [searchResult, userLocation]);

  return <div id="map" className="h-full w-full"></div>;
}

export default Map;
