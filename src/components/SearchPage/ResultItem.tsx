import { useNavigate } from 'react-router-dom';
import { FaCakeCandles, FaCircleUser, FaRegFileLines } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { API_FAILED } from '@/constants/api';
import { useModal } from '@/hooks/useModal';
import { chatService } from '@/services';
import { useAuthStore } from '@/store/useAuthStore';
import { UserList } from '@/types/searchResult.model';
import { formatGenderToKR } from '@/utils/format';
import Button from '../common/Button';
interface Props {
  searchResult: Partial<UserList>;
}

const Star = (props: Pick<UserList, 'rating'>) => {
  return (
    <span className="flex items-center pr-[8px]">
      {Array.from({ length: props.rating + 1 }).map((_, index) => (
        <FaStar key={index} className="h-[17px] w-[17px]" color="F6C002" />
      ))}
    </span>
  );
};

function ResultItem({ searchResult }: Props) {
  //신청버튼
  const {
    name = '이름 없음',
    address = { addr: '주소 없음' },
    gender = '성별 없음',
    age = '나이 정보 없음',
    experienceYears = '경력 정보 없음',
    rating = 0,
    id,
  } = searchResult;

  const { user } = useAuthStore();
  const { alert } = useModal();
  const navigate = useNavigate();
  const handleContractBtn = async () => {
    if (user === null) {
      await alert('warning', '로그인이 필요한 서비스입니다.');
      return navigate('/auth/signin');
    }
    if (!user.isCompleteProfile) {
      await alert(
        'warning',
        '서비스 이용을 위해서 먼저 프로필 작성이 필요합니다.'
      );
      return navigate('/mypage/profile');
    }
    navigate(`/mypage/contract/write/${id}`);
  };
  const handleChatBtn = async () => {
    if (user === null) {
      await alert('warning', '로그인이 필요한 서비스입니다.');
      return navigate('/auth/signin');
    }
    if (!user.isCompleteProfile) {
      await alert(
        'warning',
        '서비스 이용을 위해서 먼저 프로필 작성이 필요합니다.'
      );
      return navigate('/mypage/profile');
    }
    const createRoomResponse = await chatService.createRoom([
      user.memberId,
      id as number,
    ]);
    if (createRoomResponse.status === API_FAILED)
      return alert('warning', createRoomResponse.data.message as string);
    const chatId = createRoomResponse.data.chatId;
    return navigate(`/mypage/chat/room/${chatId}`);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-[10px] bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center gap-4">
        <FaCircleUser className="h-10 w-10" color="gray" />
        <p className="text-text-large">{name}</p>
        <ul className="flex items-center gap-5">
          <li className="flex items-center gap-1">
            <p className="font-semibold">{address.addr}</p>
          </li>
          <li className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-medium">
              <BsGenderAmbiguous color="gray-dark" />
              <p>성별</p>
            </div>
            <p className="font-semibold">{formatGenderToKR(gender)}</p>
          </li>
          <li className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-medium">
              <FaCakeCandles color="gray-dark" />
              <p>나이</p>
            </div>
            <p className="font-semibold">{age}</p>
          </li>
          {user?.role === 'USER' ? (
            <li className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-gray-medium">
                <FaRegFileLines color="gray-dark" />
                <p>경력</p>
              </div>
              <p className="font-semibold">{experienceYears}년</p>
            </li>
          ) : (
            <></>
          )}
          <Star rating={rating} />
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleContractBtn}
          type="button"
          className="border-2 border-gold bg-orange px-2.5"
        >
          <img
            src="/assets/images/paper_pencil.svg"
            title="계약서"
            alt="계약서"
          />
          신청하기
        </Button>
        <Button
          onClick={handleChatBtn}
          type="submit"
          className="bg-primary px-2.5 py-3"
        >
          <img src="/assets/images/send.svg" title="전송" alt="전송" />
          채팅하기
        </Button>
      </div>
    </div>
  );
}

export default ResultItem;
