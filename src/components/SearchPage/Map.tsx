import React, { useEffect } from 'react';
const { kakao } = window;
function Map() {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    const mapTypeControl = new kakao.maps.MapTypeControl();
  }, []);

  return <div id="map" className="h-full w-full"></div>;
}

export default Map;
