import { useState, useEffect } from 'react';

import { API_FAILED } from '@/constants/api';
import { useModal } from '@/hooks/useModal';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { GetContractDataResponse } from '@/types/api/match';
import Button from '../common/Button';
import { ContractPDFForm } from '../Contract';

export default function ContractViewModal({
  matchId,
  revalidate,
}: {
  matchId: number;
  revalidate: () => Promise<void>;
}) {
  const [contractData, setContractData] =
    useState<GetContractDataResponse | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { closeAllModal, confirm, alert } = useModal();
  const { accessToken, user } = useAuthStore();

  const handleClickAccept = async (matchId: number) => {
    if (!(await confirm('매칭 신청을 수락하시겠습니까?'))) return;
    const { data, status } = await matchService.acceptContract(matchId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (status === API_FAILED)
      return await alert('warning', data.message as string);
    await alert('success', '매칭을 수락하였습니다.');
    closeAllModal();
    return revalidate();
  };

  useEffect(() => {
    const getData = async (matchId: number) => {
      if (!matchId) return;
      const { data, status } = await matchService.getContractData(matchId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === API_FAILED) return null;
      const type = data.firstRequest.includes(user?.role as string)
        ? 'send'
        : 'receive';
      return { ...data, type };
    };
    const getPdfUrl = async (matchId: number) => {
      const { data, status } = await matchService.downloadContractPDF(matchId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/pdf',
        },
        responseType: 'arraybuffer',
      });
      if (status === API_FAILED) return null;
      return data;
    };

    setIsLoading(true);
    (async function () {
      const data = await getData(matchId);
      if (!data) return;
      else setContractData(data);
      if (data.matchStatus === 'PENDING') return;
      const pdfData = await getPdfUrl(matchId);
      if (!pdfData)
        return await alert(
          'warning',
          'PDF파일을 불러올 수 없습니다. 잠시후 다시 시도해주세요.'
        );
      const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    })();
    setIsLoading(false);
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
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
          <div className="h-[85%] w-full">
            {contractData ? (
              <ContractPDFForm contractData={contractData} />
            ) : (
              <span>계약서를 불러오는데 실패하였습니다.</span>
            )}
          </div>

          {contractData && (
            <div className="flex h-[40px] gap-2">
              {contractData &&
                contractData.type === 'receive' &&
                contractData.matchStatus === 'PENDING' && (
                  <Button
                    type="button"
                    onClick={() => handleClickAccept(matchId)}
                  >
                    수락
                  </Button>
                )}
              {pdfUrl && contractData.matchStatus !== 'PENDING' && (
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
          )}
        </div>
      )}
    </div>
  );
}
