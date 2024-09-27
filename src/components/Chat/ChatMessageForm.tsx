import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useChatContext } from '@/hooks/useChatContext';
import { useModal } from '@/hooks/useModal';
import Button from '../common/Button';
import Input from '../common/Input';

export default function ChatMessageForm() {
  const { alert } = useModal();
  const {
    sendMessage,
    currentRoomDataState: [currentRoomData],
  } = useChatContext();
  const { roomId } = useParams();
  const [message, setMessage] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  const sendButtonClassName = twMerge(
    'px-2.5 py-3',
    message.trim() === ''
      ? 'bg-gray-medium cursor-not-allowed hover:brightness-1 active:brightness-1'
      : 'bg-primary'
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    sendMessage(Number(roomId), message);
    setMessage('');
  };
  return (
    <form className="flex w-full items-center gap-3" onSubmit={handleSubmit}>
      <label
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-primary bg-white px-4 py-2.5 text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        htmlFor="attach"
      >
        <img src="/assets/images/clip.svg" title="이미지 첨부" alt="클립" />
      </label>
      <input
        className="sr-only"
        type="file"
        name="attach"
        id="attach"
        accept=".jpg, .png"
        onClick={async (e) => {
          e.preventDefault();
          await alert('warning', '현재 준비중인 기능입니다.');
        }}
      />
      <div className="flex-1">
        <label className="sr-only" htmlFor="message">
          메세지
        </label>
        <Input
          id="message"
          className="w-full border-gray-light-medium py-2.5"
          type="text"
          name="message"
          placeholder="메세지 입력"
          value={message}
          onChange={onChange}
          maxLength={200}
        />
      </div>
      <Button type="submit" className={sendButtonClassName}>
        <img src="/assets/images/send.svg" title="전송" alt="전송" />
      </Button>
      {currentRoomData?.partnerInfo && (
        <Link
          to={`/mypage/contract/write/${currentRoomData.partnerInfo.memberId}`}
          className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gold bg-orange px-2.5 py-2.5 text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          <img
            src="/assets/images/paper_pencil.svg"
            title="계약서 작성"
            alt="계약서"
          />
        </Link>
      )}
    </form>
  );
}
