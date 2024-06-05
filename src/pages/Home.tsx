import { BsMegaphoneFill } from "react-icons/bs";
import MainTitleIndex from "../components/Home/MainTitleIndex";
import { Card } from "../components/Home/Card";



const Home = () => {
  const cardSmallItem = {
    img : [
      'assets/caregiver_both.png',
      'assets/icon-contract.png',
      'assets/icon-notice.png',
    ],
    text : ['간병인 찾기', '계약 관리','자유 게시판']
  } 
  const cardLargeItem = {
    name : [
      '김0희',
      '김0희',
      '김0희',
    ],
    color : [
      'gold',
      'silver',
      'bronze'
    ]
  }
  return (
    <main className='gap-[52px] px-[52px] py-8 flex flex-col min-h-[1440px] items-center'>
      <img className='w-full' src="assets/main-banner.png"/>
      <div className="w-full h-[68px] px-[40px] py-4 flex gap-4 items-center  bg-tertiary rounded-2xl">
        <BsMegaphoneFill className="w-8 h-8" color="red"/>
        <p className="font-bold text-text-xlarge">공지사항</p>
        {/* zustand로 공지사항에서 가져오기 */}
        <p>patient pal 서비스를 오픈하였습니다.</p>
        <p>2024.06.01</p>
      </div>
      <MainTitleIndex text='서비스 바로가기'>
        <div className="flex gap-4">
          {cardSmallItem.img.map((item, index) => {
            return(
              <Card.Small key={index} index={index} text={cardSmallItem.text[index]} img={cardSmallItem.img[index]}/>
            )
          })}
        </div>
      </MainTitleIndex>
      <MainTitleIndex text='맞춤 추천'>
        <p className="absolute top-3 left-[170px] text-gray-medium-dark">※등록된 주소지를 기준으로 추천됩니다.</p>
        <div className="h-[211px] flex">

        </div>
      </MainTitleIndex>
      <MainTitleIndex text='이달의 우수 간병인'>
          <div className="flex items-center justify-center gap-4">
            {cardLargeItem.name.map((item, index) => {
              return(
                <Card.Large index={index} color={cardLargeItem.color[index]} key={index} name={item}></Card.Large>
              )
            }) 
            }
          </div>
      </MainTitleIndex>
    </main>
  )
}

export default Home
