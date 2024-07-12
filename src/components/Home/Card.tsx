import { CiCircleChevRight } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { FaCakeCandles } from 'react-icons/fa6';
export const Card = {
  Small: ({ text, img, index }) => {
    const navigate = useNavigate();
    const moveTo = (index) => {
      switch (index) {
        case 0:
          navigate('/search');
          console.log('/search');
        case 1:
          navigate('/contract');
          console.log('contract');
        case 2:
          navigate('/community/forum');
          console.log('forum');
      }
    };

    return (
      <div
        className="flex h-[100px] cursor-pointer items-center gap-1 rounded-[15px] bg-gray-light px-8 py-3 drop-shadow-lg"
        onClick={() => moveTo(index)}
      >
        <p className="text-nowrap text-title-small">{text}</p>
        <img src="/assets/right circle icon.png"></img>
        <img src={img}></img>
      </div>
    );
  },
  Medium: () => {},
  Large: ({ index, name, color }) => {
    const colorVarient = {
      gold: 'bg-gold',
      silver: 'bg-gray-light-medium',
      bronze: 'bg-light-bronze',
    };

    return (
      <div
        className={`flex h-[304px] w-[303px] flex-col gap-5 px-5 py-3 ${colorVarient[color]} rounded-[15px] drop-shadow-lg`}
      >
        <div className="flex items-center gap-3">
          <img src={`assets/icon-ranking${index + 1}.png`} />
          <p className="text-title-small">{name}</p>
          <p className="text-text-small">간병인님</p>
        </div>
        <div className="flex items-center justify-between">
          <FaCircleUser className="h-[112px] w-[112px]" color="#969696" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <FaCakeCandles color="#969696" />
                <p>나이</p>
              </div>
              <p>50세</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <FaCakeCandles color="#969696" />
                <p>성별</p>
              </div>
              <p>여성</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <FaCakeCandles color="#969696" />
                <p>경력</p>
              </div>
              <p>2년</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-col gap-3 px-1 py-3">
          <div className="flex w-[150px] justify-between">
            <p>자격증</p>
            <p>요양보호사</p>
          </div>
          <div className="flex w-[150px] justify-between">
            <p>지역</p>
            <p>서울 강남구</p>
          </div>
        </div>
      </div>
    );
  },
};
