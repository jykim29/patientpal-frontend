import { Link } from 'react-router-dom';
import { FaCakeCandles, FaCircleUser } from 'react-icons/fa6';
import { useAuthStore } from '@/store/useAuthStore';

interface ShortcutCardProps {
  label: string;
  buttonImageUrl: string;
  path: string;
}
interface RankCardProps {
  index: number;
  name: string;
  address: string;
}
interface RecommendCardProps {
  memberId: number;
  name: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  address: string;
  image: string;
  experienceYears?: number;
}

type CardType = {
  Shortcut: React.FC<ShortcutCardProps>;
  Rank: React.FC<RankCardProps>;
  Recommend: React.FC<RecommendCardProps>;
};

const Card: CardType = {
  Shortcut: ({ label, buttonImageUrl, path }: ShortcutCardProps) => {
    return (
      <Link
        to={path}
        className="flex h-[80px] cursor-pointer items-center gap-1 rounded-xl bg-gray-light px-4 py-2 shadow-lg"
      >
        <p className="text-nowrap text-text-large font-semibold">{label}</p>
        <img src="/assets/images/right_circle_icon.png" alt="바로가기 이동" />
        <img className="h-full" src={buttonImageUrl} alt={label} />
      </Link>
    );
  },
  Rank: ({ index, name, address }: RankCardProps) => {
    const bgColorList = ['bg-gold', 'bg-gray-light-medium', 'bg-light-bronze'];
    return (
      <div
        className={`flex flex-col gap-3 px-5 py-3 ${bgColorList[index]} rounded-[15px] drop-shadow-lg`}
      >
        <div className="flex items-center gap-3">
          <img src={`assets/images/icon-ranking${index + 1}.png`} />
          <p className="text-title-small">{name}</p>
          <p className="text-text-small">간병인님</p>
        </div>
        <div className="flex items-center justify-between">
          <FaCircleUser className="h-[80px] w-[80px]" color="#969696" />
          <div className="flex w-[120px] flex-col gap-3">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <FaCakeCandles color="#969696" />
                <p>나이</p>
              </div>
              <p>OO세</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <FaCakeCandles color="#969696" />
                <p>성별</p>
              </div>
              <p>비공개</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <FaCakeCandles color="#969696" />
                <p>경력</p>
              </div>
              <p>OO년</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-1 py-3">
          <div className="flex w-[150px] justify-between">
            <p>지역</p>
            <p>{address}</p>
          </div>
        </div>
      </div>
    );
  },
  Recommend: ({
    memberId,
    name,
    age,
    address,
    gender,
    image,
    experienceYears,
  }: RecommendCardProps) => {
    const user = useAuthStore((state) => state.user);
    const myRole = user && user.role;
    const roleName = myRole === 'CAREGIVER' ? '환자님' : '간병인님';
    const description = {
      genderName: gender === 'MALE' ? '남성' : '여성',
      ageName: `${age}세`,
      experienceYearsName: experienceYears
        ? `경력 ${experienceYears}년`
        : undefined,
    };
    const imageSrc = image ?? '/assets/images/default_profile.jpg';
    return (
      <div className="flex h-full w-[230px] shrink-0 flex-col items-center justify-center gap-2 rounded-md border border-tertiary p-4 text-text-small shadow-md">
        <img
          className="pointer-events-none h-16 w-16 rounded-full"
          src={imageSrc}
          alt={name}
        />
        <div>
          <span className="mr-1 text-text-medium font-semibold">{name}</span>
          <span>{roleName}</span>
        </div>
        <span>
          {Object.values(description)
            .filter((value) => value)
            .join(' / ')}
        </span>
        <span>{address}</span>
        <Link
          to={`/mypage/contract/write/${memberId}`}
          className="rounded-md bg-primary px-2 py-1 text-white transition-all hover:bg-secondary"
        >
          매칭 신청
        </Link>
      </div>
    );
  },
};

export default Card;
