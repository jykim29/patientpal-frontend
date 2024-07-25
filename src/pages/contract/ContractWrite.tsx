import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import ContractForm from '@/components/Form/contract/ContractForm';
import ContractUserInfo from '@/components/Form/contract/ContractUserInfo';
import { API_FAILED } from '@/constants/api';
import { matchService } from '@/services/MatchService';
import { GetMatchUserInfoResponse } from '@/types/api/match';
import { useAuthStore } from '@/store/useAuthStore';

export default function ContractWrite() {
  const { memberId } = useParams();
  if (isNaN(Number(memberId))) {
    alert('잘못된 접근입니다.');
    return <Navigate to={'/'} replace />;
  }
  const [matchUserInfo, setMatchUserInfo] =
    useState<GetMatchUserInfoResponse | null>(null);
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    /*
      TODO : 상대방 매칭리스트 등록 여부 & 이미 전송을 했는지 검증 필요
    */
    const getMatchUserInfo = async (memberId: string) => {
      const response = await matchService.getMatchUserInfo(memberId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    };
    getMatchUserInfo(memberId as string).then((res) => {
      if (res.status === API_FAILED) {
        alert(res.data.message);
        return navigate('/', { replace: true });
      }
      return setMatchUserInfo(res.data);
    });
  }, []);
  return (
    <section>
      <h3 className="mb-2 text-title-small">계약서 작성</h3>

      <p className="mb-2 text-gray-dark">
        상대방에게 전송할 온라인 계약서를 작성합니다.
      </p>

      <p className="mb-5 text-text-small text-negative">
        ※ 계약서를 전송한 이후에는 수정이 불가하오니 신중이 작성해주세요.
      </p>

      {matchUserInfo && (
        <>
          <ContractUserInfo matchUserInfo={matchUserInfo} />
          <ContractForm memberId={memberId} />
        </>
      )}
    </section>
  );
}
