import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_FAILED } from '@/constants/api';
import { useModal } from '@/hooks/useModal';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { GetContractDataResponse } from '@/types/api/match';
import Button from '../common/Button';
import { ContractPDFForm } from '../Contract';

export default function ContractViewModal({ matchId }: { matchId: number }) {
  const [contractData, setContractData] =
    useState<GetContractDataResponse | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { closeAllModal } = useModal();
  const { accessToken, user } = useAuthStore();
  const navigate = useNavigate();

  const handleClickAccept = async () => {
    if (!confirm('정말 수락하시겠습니까?')) return;
    const { data, status } = await matchService.acceptContract(matchId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === API_FAILED) return alert(data.message);
    closeAllModal();
    return navigate('/mypage/match-record');
  };

  useEffect(() => {
    const getData = async (matchId: number) => {
      if (!matchId) return;
      setIsLoading(true);
      const { data, status } = await matchService.getContractData(matchId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      let result = null;
      if (status === API_FAILED) setIsError(true);
      else {
        const type = data.firstRequest.includes(user?.role as string)
          ? 'send'
          : 'receive';
        result = { ...data, type };
        setContractData(result);
        setIsError(false);
      }
      setIsLoading(false);
      return result;
    };
    const getPdfUrl = async (matchId: number) => {
      const { data, status } = await matchService.downloadContractPDF(matchId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/pdf',
        },
        responseType: 'arraybuffer',
      });
      if (status === API_FAILED) return setIsError(true);
      const pdfBlob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setIsError(false);
      return setPdfUrl(url);
    };
    if (matchId)
      getData(matchId).then((res) => {
        if (res && res.matchStatus === 'ACCEPTED') return getPdfUrl(matchId);
      });
    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, []);

  return (
    <div className="h-[80vh] min-h-[600px] w-[50vw] min-w-[800px] p-5">
      <p className="mb-2 inline-block text-text-large font-semibold">
        계약서 조회
      </p>
      <p className="mb-2 ml-2 inline-block text-text-small text-gray-dark">
        ※ 하단에 보여지는 계약서 미리보기 기능으로,
        <strong className="ml-1 text-negative">
          실제 계약서가 아니며 아무런 법적 효력이 없는 문서입니다.
        </strong>
      </p>
      {isLoading ? (
        <p className="text-center text-title-medium">계약서 불러오는중...</p>
      ) : (
        <div className="flex h-full flex-col items-center gap-5">
          {contractData && (
            <div className="h-[85%] w-full">
              {isError ? (
                <span>계약서를 불러오는데 실패하였습니다.</span>
              ) : (
                <ContractPDFForm contractData={contractData} />
              )}
            </div>
          )}
          <div className="flex h-[40px] gap-2">
            {contractData &&
              contractData.type === 'receive' &&
              contractData.matchStatus === 'PENDING' && (
                <Button type="button" onClick={handleClickAccept}>
                  수락
                </Button>
              )}
            {contractData && contractData.matchStatus === 'ACCEPTED' && (
              <a
                href={pdfUrl}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-naver px-4 py-2.5 text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
                target="_blank"
                rel="noreferrer noopener"
                download
              >
                PDF파일 다운로드
              </a>
            )}
            <Button
              className="bg-gray-medium"
              type="button"
              onClick={() => {
                setContractData(null);
                closeAllModal();
              }}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
