import { useEffect, useState } from 'react';

import { API_FAILED } from '@/constants/api';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { MatchItem } from '@/types/api/match';

import MatchRecordList from '@/components/MyPage/MatchRecord/MatchRecordList';

type MatchList = Record<string, any> & {
  send: MatchItem[];
  receive: MatchItem[];
};

const initialState: MatchList = { send: [], receive: [] };

/*
  TODO
  1. 환자와 간병인이 서로에게 매칭 신청 시, matchStatus가 동기화되지 않는 문제 백엔드와 협의 필요 
*/
export function Component() {
  const { accessToken, user } = useAuthStore();
  const [matchList, setMatchList] = useState<MatchList>(initialState);
  const [isError, setIsError] = useState<boolean>(false);

  const getData = async () => {
    setIsError(false);
    const sendListResponse = await matchService.getSendContractList(
      user?.memberId as number,
      0,
      50,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const receiveListResponse = await matchService.getReceivedContractList(
      user?.memberId as number,
      0,
      50,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (
      sendListResponse.status === API_FAILED ||
      receiveListResponse.status === API_FAILED
    ) {
      return setIsError(true);
    }
    const sortedSendList = sendListResponse.data.matchList.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
    const sortedReceiveList = receiveListResponse.data.matchList.sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
    return {
      send: sortedSendList,
      receive: sortedReceiveList,
    };
  };

  const revalidate = async () => {
    const response = await getData();
    if (response) setMatchList(response);
  };
  useEffect(() => {
    revalidate();
  }, []);
  return (
    <section className="flex flex-col justify-center">
      <h1 className="mb-10 text-title-small">매칭기록 관리</h1>

      {isError ? (
        <span>데이터를 불러올 수 없습니다.</span>
      ) : (
        <MatchRecordList listData={matchList} revalidate={revalidate} />
      )}
    </section>
  );
}

Component.displayName = 'MatchRecordPage';
