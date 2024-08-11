import { BsMegaphoneFill } from 'react-icons/bs';
import MainTitleIndex from '../components/Home/MainTitleIndex';
import { Card } from '../components/Home/Card';

function Home() {
  const cardSmallItem = {
    img: [
      'assets/caregiver_both.png',
      'assets/icon-contract.png',
      'assets/icon-notice.png',
    ],
    text: ['간병인 찾기', '계약 관리', '자유 게시판'],
  };
  const cardLargeItem = {
    name: ['김0희', '김0희', '김0희'],
    color: ['gold', 'silver', 'bronze'],
  };
  return (
    <main className="flex min-h-[1440px] w-[1190px] flex-col items-center gap-[52px] px-[52px] py-8">
      <img className="w-full" src="assets/main-banner.png" />
      <div className="flex h-[68px] w-full items-center gap-4 rounded-2xl bg-tertiary px-[40px] py-4">
        <BsMegaphoneFill className="h-8 w-8" color="red" />
        <p className="text-text-xlarge font-bold">공지사항</p>
        {/* zustand로 공지사항에서 가져오기 */}
        <p>patient pal 서비스를 오픈하였습니다.</p>
        <p>2024.06.01</p>
      </div>
      <MainTitleIndex text="서비스 바로가기" size="medium">
        <div className="flex gap-4">
          {cardSmallItem.img.map((_, index) => {
            return (
              <Card.Small
                key={index}
                index={index}
                text={cardSmallItem.text[index]}
                img={cardSmallItem.img[index]}
              />
            );
          })}
        </div>
      </MainTitleIndex>
      <MainTitleIndex text="맞춤 추천" size="medium">
        <p className="absolute left-[170px] top-3 text-gray-medium-dark">
          ※등록된 주소지를 기준으로 추천됩니다.
        </p>
        <div className="flex h-[211px]"></div>
      </MainTitleIndex>
      <MainTitleIndex text="이달의 우수 간병인" size="medium">
        <div className="flex items-center justify-center gap-4">
          {cardLargeItem.name.map((item, index) => {
            return (
              <Card.Large
                index={index}
                color={
                  cardLargeItem.color[index] as 'gold' | 'silver' | 'bronze'
                }
                key={index}
                name={item}
              />
            );
          })}
        </div>
      </MainTitleIndex>
    </main>
  );
}

export default Home;
