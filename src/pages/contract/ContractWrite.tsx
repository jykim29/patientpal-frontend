import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import ContractForm from '@/components/Form/contract/ContractForm';
import ContractUserInfo from '@/components/Form/contract/ContractUserInfo';
import { API_FAILED } from '@/constants/api';
import { matchService } from '@/services/MatchService';
import { GetMatchUserInfoResponse } from '@/types/api/match';
import { useAuthStore } from '@/store/useAuthStore';
import { validateObject } from '@/utils/validateObject';

export function Component() {
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
    const getMatchUserInfo = async (memberId: number) => {
      const response = await matchService.getMatchUserInfo(Number(memberId), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    };
    getMatchUserInfo(Number(memberId)).then((res) => {
      if (res.status === API_FAILED) {
        alert(res.data.message);
        return navigate('/', { replace: true });
      }
      const isValidInfo = validateObject(res.data);
      if (!isValidInfo) {
        alert('프로필을 등록하지 않은 사용자입니다.');
        return navigate(-1);
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

Component.displayName = 'ContractWrite';
