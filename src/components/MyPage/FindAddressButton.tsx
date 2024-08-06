import { useEffect } from 'react';
import Button from '../common/Button';

interface Props {
  onCompleted: (address: string) => void;
  isEditable: boolean;
}
const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
function FindAddressButton({ onCompleted, isEditable }: Props) {
  //스크립트 로드 (모든 상황에서 script가 쓰이지 않기 때문에 index.html에 넣지 않는다)

  //핸들러
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data);
      },
    }).open();
  };
  //입력

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button
      disabled={!isEditable}
      type="button"
      className="absolute right-14"
      onClick={handleOpen}
    >
      주소 찾기
    </Button>
  );
}

export default FindAddressButton;
