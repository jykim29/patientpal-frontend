import { useState } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';

import { MatchItem } from '@/types/api/match';
import Button from '@/components/common/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { useModal } from '@/hooks/useModal';
import { API_FAILED } from '@/constants/api';
import { matchService } from '@/services/MatchService';
import { ContractViewModal, ReviewWriteModal } from '@/components/Modal';

type MatchList = {
  all?: MatchItem[];
  send: MatchItem[];
  receive: MatchItem[];
};
type DivisionKey = 'all' | 'send' | 'receive';
type Division = {
  [key in DivisionKey]: {
    label: string;
    imgSrc: string;
    textColor: string;
  };
};
type MatchStatusContents = {
  [key in 'send' | 'receive']: {
    [key in 'PENDING' | 'CANCELED' | 'ACCEPTED' | 'COMPLETED']: {
      label: string;
      textColor: string;
      actionButton: {
        bgColor: string;
        label: string;
        imgSrc: string;
        eventType: 'cancel' | 'contract' | 'review';
      } | null;
    };
  };
};
type ReadStatusContents = {
  [key in 'READ' | 'UNREAD']: {
    label: string;
    textColor: string;
  };
};

const division: Division = {
  all: {
    label: '전체',
    imgSrc: '',
    textColor: 'text-black',
  },
  send: {
    label: '보냄',
    imgSrc: '/assets/images/arrow_send.svg',
    textColor: 'text-naver',
  },
  receive: {
    label: '받음',
    imgSrc: '/assets/images/arrow_receive.svg',
    textColor: 'text-primary',
  },
};
const readStatusContents: ReadStatusContents = {
  UNREAD: {
    label: '미열람',
    textColor: 'text-negative',
  },
  READ: {
    label: '열람',
    textColor: 'text-primary',
  },
};
const matchStatusContents: MatchStatusContents = {
  send: {
    PENDING: {
      label: '수락 대기',
      textColor: 'text-black',
      actionButton: {
        bgColor: 'bg-negative',
        label: '신청 취소',
        imgSrc: '/assets/images/cross_white.svg',
        eventType: 'cancel',
      },
    },
    ACCEPTED: {
      label: '수락',
      textColor: 'text-primary',
      actionButton: {
        bgColor: 'bg-primary',
        label: '계약서 조회',
        imgSrc: '/assets/images/contract_search.svg',
        eventType: 'contract',
      },
    },
    CANCELED: {
      label: '취소',
      textColor: 'text-negative',
      actionButton: null,
    },
    COMPLETED: {
      label: '완료',
      textColor: 'text-naver',
      actionButton: {
        bgColor: 'bg-orange',
        label: '후기 작성',
        imgSrc: '/assets/images/contract_search.svg',
        eventType: 'review',
      },
    },
  },
  receive: {
    PENDING: {
      label: '수락 대기',
      textColor: 'text-black',
      actionButton: {
        bgColor: 'bg-primary',
        label: '계약서 조회',
        imgSrc: '/assets/images/contract_search.svg',
        eventType: 'contract',
      },
    },
    ACCEPTED: {
      label: '수락',
      textColor: 'text-primary',
      actionButton: {
        bgColor: 'bg-primary',
        label: '계약서 조회',
        imgSrc: '/assets/images/contract_search.svg',
        eventType: 'contract',
      },
    },
    CANCELED: {
      label: '취소',
      textColor: 'text-negative',
      actionButton: null,
    },
    COMPLETED: {
      label: '완료',
      textColor: 'text-naver',
      actionButton: {
        bgColor: 'bg-orange',
        label: '후기 작성',
        imgSrc: '/assets/images/contract_search.svg',
        eventType: 'review',
      },
    },
  },
};
export default function MatchRecordList({
  listData,
  revalidate,
}: {
  listData: MatchList;
  revalidate: () => Promise<void>;
}) {
  const { openModal, createModal, confirm, alert } = useModal();
  const { accessToken, user } = useAuthStore();
  const [filter, setFilter] = useState<DivisionKey>('all');
  const [matchId, setMatchId] = useState<number>(0);

  let filteredItems: MatchItem[] = listData[filter] || [];
  if (filter === 'all')
    filteredItems = [...listData.send, ...listData.receive].sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

  const cancelMatchRequest = async (matchId: number) => {
    if (!(await confirm('매칭 신청을 취소하시겠습니까?'))) return;
    const cancelResponse = await matchService.cancelContract(matchId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (cancelResponse.status === API_FAILED)
      return await alert('warning', cancelResponse.data.message);
    await alert('success', '매칭 신청이 취소되었습니다.');
    return revalidate();
  };

  const handleClickOpenModal =
    (eventType: 'contract' | 'cancel' | 'review', matchId: number) =>
    async () => {
      setMatchId(matchId);
      // 계약서 조회
      if (eventType === 'contract') openModal('contract-view');
      // 매칭 취소
      if (eventType === 'cancel') cancelMatchRequest(matchId);
      // 리뷰 작성
      if (eventType === 'review') openModal('contract-review');
    };

  const contractViewModal = createModal(
    { modalName: 'contract-view' },
    <ContractViewModal matchId={matchId} revalidate={revalidate} />
  );
  const contractReviewModal = createModal(
    { modalName: 'contract-review' },
    <ReviewWriteModal />
  );
  return (
    <>
      <MatchRecordFilter
        division={division}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="overflow-hidden rounded-xl border border-gray-light-medium">
        <div className="match-record-list-item bg-primary px-8 py-2 font-semibold text-white">
          <span>구분</span>
          <span>파트너명</span>
          <span>간병 기간</span>
          <span>금액</span>
          <span>매칭 상태</span>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <ul className="flex flex-col gap-3 bg-gray-light px-8 py-3">
            {filteredItems.length > 0 ? (
              filteredItems.map(
                ({
                  matchId,
                  careStartDateTime,
                  careEndDateTime,
                  receivedMemberName,
                  requestMemberName,
                  totalAmount,
                  type,
                  matchStatus,
                  readStatus,
                  createdDate,
                }) => {
                  const partnerName =
                    type === 'send' ? receivedMemberName : requestMemberName;
                  const period = `${format(careStartDateTime, 'yyyy-MM-dd')} ~ ${format(careEndDateTime, 'yyyy-MM-dd')} `;
                  const duration = `${differenceInCalendarDays(careEndDateTime, careStartDateTime) + 1}`;
                  const matchStatusContent =
                    matchStatusContents[type as keyof MatchStatusContents][
                      matchStatus as keyof MatchStatusContents[
                        | 'send'
                        | 'receive']
                    ];
                  const readStatusContent =
                    readStatusContents[readStatus as keyof ReadStatusContents];
                  const leftDayCount = Math.abs(
                    differenceInCalendarDays(Date.now(), careStartDateTime)
                  );
                  const dDay =
                    leftDayCount > 0
                      ? ''
                      : leftDayCount < 0
                        ? `(D - ${leftDayCount})`
                        : leftDayCount === 0
                          ? '(당일)'
                          : leftDayCount;
                  const buttonProps = matchStatusContent.actionButton;
                  const button = buttonProps ? (
                    <Button
                      className={`flex h-full items-center px-2 py-0 ${buttonProps?.bgColor || ''}`}
                      type="button"
                      onClick={handleClickOpenModal(
                        buttonProps.eventType,
                        matchId
                      )}
                    >
                      <img
                        src={buttonProps?.imgSrc || ''}
                        alt={buttonProps?.label || ''}
                      />
                      <span className="text-text-small">
                        {buttonProps?.label || ''}
                      </span>
                    </Button>
                  ) : null;
                  let isShowButton = false;
                  if (matchStatus === 'PENDING') isShowButton = true;
                  if (matchStatus === 'ACCEPTED') isShowButton = true;
                  if (matchStatus === 'COMPLETED' && user?.role === 'USER')
                    isShowButton = true;
                  const isShowReadStatus =
                    readStatus && matchStatus === 'PENDING';
                  return (
                    <li
                      key={new Date(createdDate).getTime()}
                      className="match-record-list-item h-12 select-none rounded-lg border border-gray-light-medium bg-white py-2 transition-all hover:border-tertiary hover:bg-blue-100"
                    >
                      {/* 구분 */}
                      <span className="list-item-container">
                        <img
                          src={division[type as DivisionKey].imgSrc}
                          alt={division[type as DivisionKey].label}
                        />
                        <span
                          className={`text-text-small font-semibold ${division[type as DivisionKey].textColor}`}
                        >
                          {division[type as DivisionKey].label}
                        </span>
                      </span>
                      {/* 파트너명 */}
                      <span className="list-item-container">{partnerName}</span>
                      {/* 간병 기간 */}
                      <span className="list-item-container">
                        <img src="/assets/images/calendar.svg" alt="calendar" />
                        <span>{period}</span>
                        <span className="text-negative">{`(${duration}일)`}</span>
                      </span>
                      {/* 금액 */}
                      <span className="list-item-container">
                        <img src="/assets/images/won.svg" alt="won" />
                        <span>{`${totalAmount.toLocaleString('ko-KR')}원`}</span>
                      </span>
                      {/* 매칭 상태 */}
                      <span>
                        <span
                          className={`font-semibold ${matchStatusContent.textColor}`}
                        >
                          {matchStatusContent.label}
                        </span>
                        {isShowReadStatus && (
                          <span
                            className={`ml-1 text-text-small ${readStatusContent.textColor}`}
                          >{`(${readStatusContent.label})`}</span>
                        )}
                        {matchStatus === 'ACCEPTED' && (
                          <span className="ml-1 text-text-small text-negative">
                            {dDay}
                          </span>
                        )}
                      </span>
                      <span className="list-item-container">
                        {isShowButton && button}
                      </span>
                    </li>
                  );
                }
              )
            ) : (
              <li className="text-center">표시할 내용이 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
      {contractViewModal}
      {contractReviewModal}
    </>
  );
}

function MatchRecordFilter({
  division,
  filter,
  setFilter,
}: {
  division: Division;
  filter: DivisionKey;
  setFilter: React.Dispatch<React.SetStateAction<DivisionKey>>;
}) {
  return (
    <div className="mb-5 flex justify-center gap-4">
      {Object.entries(division).map(([key, { label }]) => (
        <button
          type="button"
          key={key}
          className={`h-[40px] w-[110px] rounded-3xl px-4 py-2 ${filter === key ? 'bg-primary text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter(key as DivisionKey)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
