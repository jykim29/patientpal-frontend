import { useEffect, useState } from 'react';
import { differenceInDays, format } from 'date-fns';

import { API_FAILED, API_SUCCESS } from '@/constants/api';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { MatchItem } from '@/types/api/match';
import Button from '@/components/common/Button';

type MatchList = Record<string, any> & {
  send: MatchItem[] | [];
  receive: MatchItem[] | [];
};

const filterLabel: { [key: string]: any } = {
  all: {
    label: '전체',
    imgSrc: '',
  },
  send: {
    label: '보냄',
    imgSrc: '/assets/arrow_send.svg',
  },
  receive: {
    label: '받음',
    imgSrc: '/assets/arrow_receive.svg',
  },
};

const statusLabel: { [key: string]: string } = {
  PENDING: '수락 대기',
  ACCEPTED: '수락 완료',
  CANCELED: '매칭 취소',
  UNREAD: '계약서 미열람',
  READ: '계약서 열람',
};

const buttonLabel: { [key: string]: any } = {
  PENDING: {
    send: {
      label: '신청 취소',
      color: 'bg-negative',
      imgSrc: '/assets/cross_white.svg',
      eventType: 'cancel',
    },
    receive: {
      label: '계약서 조회',
      color: 'bg-primary',
      imgSrc: '/assets/contract_search.svg',
      eventType: 'view',
    },
  },
  ACCEPTED: {
    send: {
      label: '계약서 조회',
      color: 'bg-primary',
      imgSrc: '/assets/contract_search.svg',
      eventType: 'view',
    },
    receive: {
      label: '계약서 조회',
      color: 'bg-primary',
      imgSrc: '/assets/contract_search.svg',
      eventType: 'view',
    },
  },
};

// 임시 memberId
const memberId = 2;
const initialState: MatchList = { send: [], receive: [] };

/*
  TODO
  1. 임시 memberId와 matchId를 서버데이터로 교체
  2. 계약서 조회 버튼 클릭 시, 모달로 계약서 렌더링 후 매칭 수락 여부를 결정하는 기능 구현
  3. 계약서 PDF 뷰어 및 다운로드 기능 구현
  4. 환자와 간병인이 서로에게 매칭 신청 시, matchStatus가 동기화되지 않는 문제 백엔드와 협의 필요 
*/
function MatchRecordPage() {
  const { accessToken } = useAuthStore();
  const [matchList, setMatchList] = useState<MatchList>(initialState);
  const [filter, setFilter] = useState<string>('all');

  let filteredItems: MatchItem[] = matchList[filter];
  if (filter === 'all')
    filteredItems = [...matchList.send, ...matchList.receive].sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

  const handleClick =
    (type: 'view' | 'accept' | 'cancel', matchId: number) => async () => {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      // 계약서 조회
      if (type === 'view') {
        const response = await matchService.getContractData(
          matchId,
          axiosConfig
        );
        if (response.status === API_FAILED) return alert(response.data.message);
        return console.log(response.data);
      }
      // 매칭 수락 (API 작성 예정)
      if (type === 'accept') {
        // ...
      }
      // 매칭 취소
      if (type === 'cancel') {
        if (!confirm('매칭을 취소하시겠습니까?')) return;
        const response = await matchService.cancelContract(
          matchId,
          axiosConfig
        );
        if (response.status === API_FAILED) return alert(response.data.message);
        return console.log(response.data);
      }
    };

  useEffect(() => {
    const getData = async () => {
      const sendListResponse = await matchService.getSendContractList(
        memberId,
        0,
        10,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const receiveListResponse = await matchService.getReceivedContractList(
        memberId,
        0,
        10,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (
        sendListResponse.status === API_SUCCESS &&
        receiveListResponse.status === API_SUCCESS
      ) {
        const newSendList = [...sendListResponse.data.matchList].map(
          (value) => ({ ...value, type: 'send' })
        );
        const newReceiveList = [...receiveListResponse.data.matchList].map(
          (value) => ({ ...value, type: 'receive' })
        );
        return { send: newSendList, receive: newReceiveList };
      }
      return { send: [], receive: [] };
    };
    getData().then((res) => setMatchList(res));
  }, []);

  return (
    <section className="flex flex-col justify-center">
      <h1 className="mb-10 text-title-small">매칭기록 관리</h1>

      <div className="mb-5 flex justify-center gap-4">
        {Object.entries(filterLabel).map(([key, { label }]) => (
          <button
            type="button"
            key={key}
            className={`h-[40px] w-[110px] rounded-3xl px-4 py-2 ${filter === key ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-light-medium">
        <div className="flex w-full items-center bg-primary px-8 py-2 text-center font-semibold text-white">
          <span className="w-[10%]">구분</span>
          <span className="w-[15%]">파트너명</span>
          <span className="w-[30%]">간병 기간</span>
          <span className="w-[15%]">금액</span>
          <span className="w-[13%]">매칭 상태</span>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          <ul className="flex flex-col gap-3 bg-gray-light px-8 py-3">
            {filteredItems.length > 0 ? (
              filteredItems.map(
                ({
                  careStartDateTime,
                  careEndDateTime,
                  receivedMemberName,
                  totalAmount,
                  type,
                  matchStatus,
                  readStatus,
                  createdDate,
                }) => {
                  const period = `${format(careStartDateTime, 'yyyy-MM-dd')} ~ ${format(careEndDateTime, 'yyyy-MM-dd')} `;
                  const duration = `${differenceInDays(careEndDateTime, careStartDateTime)}`;
                  const button =
                    matchStatus === 'PENDING' || matchStatus === 'ACCEPTED' ? (
                      <Button
                        className={`ml-5 flex h-full items-center px-2 py-0 ${buttonLabel[matchStatus][type].color || ''}`}
                        type="button"
                        onClick={handleClick(
                          buttonLabel[matchStatus][type].eventType,
                          1
                        )}
                      >
                        <img
                          src={buttonLabel[matchStatus][type].imgSrc}
                          alt={buttonLabel[matchStatus][type].label}
                        />
                        <span className="text-text-small">
                          {buttonLabel[matchStatus][type].label}
                        </span>
                      </Button>
                    ) : null;
                  return (
                    <li
                      key={new Date(createdDate).getTime()}
                      className="flex h-12 w-full items-center rounded-lg bg-white py-2 text-center shadow-[0px_0px_8px_2px_#d8d8d8]"
                    >
                      <span className="flex w-[10%] items-center justify-center gap-1">
                        <img
                          src={filterLabel[type].imgSrc}
                          alt={filterLabel[type as string].label}
                        />
                        <span
                          className={`text-text-small font-semibold ${type === 'send' ? 'text-naver' : 'text-primary'}`}
                        >
                          {filterLabel[type as string].label}
                        </span>
                      </span>
                      <span className="w-[15%]">{receivedMemberName}</span>
                      <span className="flex w-[30%] items-center justify-center gap-1">
                        <img src="/assets/calendar.svg" alt="calendar" />
                        <span>{period}</span>
                        <span className="text-negative">{`(${duration}일)`}</span>
                      </span>
                      <span className="flex w-[15%] items-center justify-center gap-1">
                        <img src="/assets/won.svg" alt="won" />
                        <span>{`${totalAmount.toLocaleString('ko-KR')}원`}</span>
                      </span>
                      <span className="w-[13%]">
                        {statusLabel[matchStatus]}
                        {readStatus && (
                          <span
                            className={`ml-1 block text-text-small ${readStatus === 'READ' ? 'text-primary' : 'text-negative'}`}
                          >{`(${statusLabel[readStatus]})`}</span>
                        )}
                      </span>
                      {button}
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
    </section>
  );
}

export default MatchRecordPage;
