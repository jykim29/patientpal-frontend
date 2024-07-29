import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { differenceInDays, format } from 'date-fns';

import { API_FAILED, API_SUCCESS } from '@/constants/api';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { GetContractDataResponse, MatchItem } from '@/types/api/match';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useModal } from '@/hooks/useModal';
import { ContractPDFForm } from '@/components/Contract';

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

const initialState: MatchList = { send: [], receive: [] };

/*
  TODO
  2. 계약서 조회 버튼 클릭 시, 모달로 계약서 렌더링 후 매칭 수락 여부를 결정하는 기능 구현
  3. 계약서 PDF 뷰어 및 다운로드 기능 구현
  4. 환자와 간병인이 서로에게 매칭 신청 시, matchStatus가 동기화되지 않는 문제 백엔드와 협의 필요 
*/
function MatchRecordPage() {
  const { accessToken, user } = useAuthStore();
  const { createModal, openModal, closeAllModal } = useModal();
  const [matchList, setMatchList] = useState<MatchList>(initialState);
  const [selectMatchId, setSelectMatchId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  let filteredItems: MatchItem[] = matchList[filter];
  if (filter === 'all')
    filteredItems = [...matchList.send, ...matchList.receive].sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

  const contractViewModal = createModal(
    'contract',
    <ContractViewModal matchId={selectMatchId as number} />
  );

  const handleClick =
    (eventType: 'view' | 'cancel', matchId: number) => async () => {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      // 계약서 조회
      if (eventType === 'view') {
        setSelectMatchId(matchId);
        openModal('contract');
      }
      // 매칭 취소
      if (eventType === 'cancel') {
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
        user?.memberId as number,
        0,
        10,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const receiveListResponse = await matchService.getReceivedContractList(
        user?.memberId as number,
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
      {/* 필터 */}
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

      {/* 매칭 기록 리스트 */}
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
                  const duration = `${differenceInDays(careEndDateTime, careStartDateTime)}`;
                  const button =
                    matchStatus === 'PENDING' || matchStatus === 'ACCEPTED' ? (
                      <Button
                        className={`ml-5 flex h-full items-center px-2 py-0 ${buttonLabel[matchStatus][type].color || ''}`}
                        type="button"
                        onClick={handleClick(
                          buttonLabel[matchStatus][type].eventType,
                          matchId
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
                      className="flex h-12 w-full cursor-pointer select-none items-center rounded-lg border border-gray-light-medium bg-white py-2 text-center transition-all hover:border-tertiary hover:bg-blue-100"
                    >
                      {/* 구분 */}
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
                      {/* 파트너명 */}
                      <span className="w-[15%]">{partnerName}</span>
                      {/* 간병 기간 */}
                      <span className="flex w-[30%] items-center justify-center gap-1">
                        <img src="/assets/calendar.svg" alt="calendar" />
                        <span>{period}</span>
                        <span className="text-negative">{`(${duration}일)`}</span>
                      </span>
                      {/* 금액 */}
                      <span className="flex w-[15%] items-center justify-center gap-1">
                        <img src="/assets/won.svg" alt="won" />
                        <span>{`${totalAmount.toLocaleString('ko-KR')}원`}</span>
                      </span>
                      {/* 매칭 상태 */}
                      <span className="w-[13%] text-text-small">
                        {statusLabel[matchStatus]}
                        {readStatus && matchStatus === 'PENDING' && (
                          <span
                            className={`ml-1 block text-text-small ${readStatus === 'READ' ? 'text-primary' : 'text-negative'}`}
                          >{`(${statusLabel[readStatus]})`}</span>
                        )}
                        {matchStatus === 'ACCEPTED' && (
                          <span className="ml-1 block text-text-small text-negative">
                            {`D ${differenceInDays(Date.now(), careStartDateTime)}`}
                          </span>
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

      {contractViewModal}
    </section>
  );
}

function ContractViewModal({ matchId }: { matchId: number }) {
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
      if (status === API_FAILED) setIsError(true);
      else {
        const type = data.firstRequest.includes(user?.role as string)
          ? 'send'
          : 'receive';
        setContractData({ ...data, type });
        setIsError(false);
      }
      return setIsLoading(false);
    };
    const getPdfUrl = async (matchId: number) => {
      const { data, status } = await matchService.downloadContractPDF(matchId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status === API_FAILED) return setIsError(true);
      const pdfBlob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(pdfBlob);
      setIsError(false);
      return setPdfUrl(url);
    };
    getData(matchId).then(() => getPdfUrl(matchId));
    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, []);

  return (
    <Modal className={{ box: 'h-[80vh] min-h-[600px] w-[50vw] min-w-[800px]' }}>
      <p className="mb-2 text-center text-title-small">계약서 미리보기</p>
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
    </Modal>
  );
}

export default MatchRecordPage;
