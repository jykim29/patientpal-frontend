import { useRef } from 'react';
import { differenceInDays, format } from 'date-fns';
import { GetContractDataResponse } from '@/types/api/match';
import { useAuthStore } from '@/store/useAuthStore';
import { Role } from '@/types/user';
import ScrollProgressBar, { ScrollHandle } from '../common/ScrollProgressBar';

export default function ContractPDFForm({
  contractData,
}: {
  contractData: GetContractDataResponse;
}) {
  const user = useAuthStore((state) => state.user);
  const {
    type,
    careStartDateTime,
    careEndDateTime,
    isNok,
    nokName,
    nokContact,
    receivedMemberName,
    receivedMemberAddress,
    receivedMemberContact,
    requestMemberName,
    requestMemberAddress,
    requestMemberContact,
    requestMemberCurrentSignificant,
    realCarePlace,
    totalAmount,
    firstRequest,
    createdDate,
  } = contractData;
  const progressBarRef = useRef<ScrollHandle>(null);
  const myRole = user?.role as Role;
  const isRequest = firstRequest.includes(myRole);
  const myInfo = {
    name: isRequest ? requestMemberName : receivedMemberName,
    address: isRequest ? requestMemberAddress : receivedMemberAddress,
    contact: isRequest ? requestMemberContact : receivedMemberContact,
  };
  const partnerInfo = {
    name: !isRequest ? requestMemberName : receivedMemberName,
    address: !isRequest ? requestMemberAddress : receivedMemberAddress,
    contact: !isRequest ? requestMemberContact : receivedMemberContact,
  };
  const patientData = {
    name: myRole === 'USER' ? myInfo.name : partnerInfo.name,
    address: myRole === 'USER' ? myInfo.address : partnerInfo.address,
    contact: myRole === 'USER' ? myInfo.contact : partnerInfo.contact,
  };
  const caregiverData = {
    name: myRole === 'CAREGIVER' ? myInfo.name : partnerInfo.name,
    address: myRole === 'CAREGIVER' ? myInfo.address : partnerInfo.address,
    contact: myRole === 'CAREGIVER' ? myInfo.contact : partnerInfo.contact,
  };
  if (isNok) {
    patientData.name = nokName;
    patientData.contact = nokContact;
  }
  const period = `${format(careStartDateTime, 'yyyy. MM. dd')} ~ ${format(careEndDateTime, 'yyyy. MM. dd')}`;
  const duration = differenceInDays(careEndDateTime, careStartDateTime);

  const handleScroll = (e: React.UIEvent) => {
    const { scrollHeight, clientHeight, scrollTop } = e.currentTarget;
    progressBarRef.current?.getScrollPercent({
      scrollHeight,
      clientHeight,
      scrollTop,
    });
  };

  return (
    <div className="contract-wrapper" onScroll={handleScroll}>
      <ScrollProgressBar ref={progressBarRef} />
      <div className="contract-container">
        <div className="contract-title">
          <span>간병인 중개 표준 계약서(개인 간병)</span>
        </div>
        <p>
          간병인 중개업체(이하 ‘중개업체’라고 한다)는 간병인과 구인자(환자 또는
          보호자)가 아래와 같이 간병 계약을 체결하도록 중개한다.
        </p>

        <table className="contract-information-table">
          <tbody>
            <tr>
              <th>중개업체</th>
              <th>상호</th>
              <td>페이션트팔</td>
            </tr>
            <tr>
              <th rowSpan={3}>간병인</th>
              <th>성명</th>
              <td>{caregiverData.name}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{caregiverData.contact}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{caregiverData.address}</td>
            </tr>

            <tr>
              <th rowSpan={5}>구인자</th>
              <th>성명</th>
              <td>{patientData.name}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{patientData.contact}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{patientData.address}</td>
            </tr>
            <tr>
              <th>환자와의 관계</th>
              <td>{isNok ? '보호자' : '본인'}</td>
            </tr>
          </tbody>
        </table>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제1조(목적)</strong>이
            계약은 환자의 건강 회복을 위한 간병인을 중개함에 있어 중개업체,
            간병인, 구인자의 권리와 의무에 대한 기본적인 사항을 정하는 것을
            목적으로 한다.
          </p>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제2조(간병의 범위)</strong>
            간병인은 환자에게 필요한 다음 각호의 간병 업무를 수행한다.
          </p>
          <ol className="contract-terms-list decimal">
            <li>
              환자의 식사, 개인위생, 침대시트 교체, 배설, 이동, 목욕, 수면 등
              일상생활 보조
            </li>
            <li>약물투여보조, 체위변경 등 환자에 대한 치료행위의 보조</li>
            <li>의료인의 지시에 따른 환자의 상태 관찰 및 보고</li>
            <li>산책, 보행훈련 등 재활훈련 보조</li>
            <li>
              기타 의료인의 지시에 따른 것으로, 환자의 회복을 위하여 필요한
              행위. 단 의료행위는 제외한다.
            </li>
          </ol>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제3조(계약사항)</strong>①
            간병인과 구인자는 간병 개시 전 다음 각 호의 사항을 협의하여 계약
            서를 작성하여야 한다.
          </p>
          <ol className="contract-terms-list decimal">
            <li>간병 기간</li>
            <li>간병 장소</li>
            <li>간병 요금</li>
            <li>
              기타 사항 : 공휴일·명절 간병 시 요금, 휴일(유급 또는 무급), 식비,
              중개수수료, 현금영 수증 발급 여부 등
            </li>
          </ol>
          <p>
            ② 제1항 제3호의 간병요금을 정함에 있어 환자의 중증도를 고려하여야
            한다.
          </p>
          <p>
            ③ 제1항 제4호의 휴게시간을 정함에 있어 구체적인 휴게시간을 정하기
            어려운 경우에는 간병인이 4시간 근무시 식사시간을 포함하여 30분의
            휴게시간을 갖는 것으로 본다.
          </p>
        </div>

        <div>
          <span>
            <strong>[계약사항]</strong>
          </span>
          <table className="contract-form-table">
            <tbody>
              <tr>
                <th className="divided-left">기 간</th>
                <td>
                  <p>
                    {period} <span>{`(총 ${duration}일)`}</span>
                  </p>
                </td>
              </tr>
              <tr>
                <th>장 소</th>
                <td>{realCarePlace}</td>
              </tr>
              <tr>
                <th>요 금</th>
                <td>{`${totalAmount.toLocaleString('ko-KR')} 원`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <span>
            <strong>[특이 사항]</strong>
          </span>
          <table className="contract-etc-table">
            <tbody>
              <tr>
                <td>{requestMemberCurrentSignificant}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">
              제4조(중개업체 의무)
            </strong>
            ① 중개업체는 간병인이 간병에 필수적으로 요구되는 교육을 이수 하도록
            지도한다.
          </p>
          <p>
            ② 중개업체는 간병인에게 제공하기 위하여 구인자로부터 간병비를
            선금으로 받아서는 아니된다.
          </p>
          <p>
            ③ 중개업체는 구인자의 간병인 교체 요청 또는 간병인이 부득이한
            사정으로 간병서비스를 제공하기 어려운 경우 구인자에게 대체 간병인을
            제공하기 위한 노력을 하여야 한다.
          </p>
          <p>
            ④ 중개업체는 간병 중개 계약 전에 중개수수료, 지불 방법 등을
            구인자에게 명확하게 안내 하고 계약서에 명시하여야 한다.
          </p>
          <p>
            ⑤ 중개업체는 간병인에게 감염병 예방을 위한 의료 방역 물품 지급 등의
            필요한 조치를 취하여야 한다.
          </p>
          <p>
            ⑥ 중개업체는 간병인 중개에 있어 직업안정법 및 기타 관련 법률의
            규정을 준수해야 한다.
          </p>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제5조(간병인 의무)</strong>
            ① 간병인은 환자의 안전과 감염예방에 유의하며, 구인자와 합의한 계
            약사항을 준수하여 간병서비스를 제공한다.
          </p>
          <p>
            ② 간병인은 환자의 치료와 관련하여 병원의 의료진이 환자 진료 및
            치료를 진행함에 있어 적절한 조치를 하도록 협조하여야 하며, 병원이
            정한 규제사항을 준수한다.
          </p>
          <p>
            ③ 간병인은 환자 또는 그 가족의 개인정보를 누설하여서는 아니된다.
          </p>
          <p>
            ④ 간병인은 환자의 보호 및 치료를 소홀히 하거나 폭언, 폭행, 상해 또는
            성희롱, 성폭력 등 신체적, 정신적 해를 끼치는 행위를 하여서는
            아니된다.
          </p>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제6조(구인자 의무)</strong>
            ① 구인자는 제4조에서 정한 간병요금을 기한 내에 납부하여야 한다.
          </p>
          <p>
            ② 구인자는 환자의 건강상태, 감염가능성 등 기타 간병에 필요한 정보를
            간병인에게 충분히 제공하여야 한다.
          </p>
          <p>
            ③ 구인자는 간병인에게 폭언, 폭행, 상해 또는 성희롱, 성폭력 등
            신체적, 정신적 해를 끼치는 행위를 하여서는 아니된다.
          </p>
          <p>
            ④ 구인자는 간병인에게 제2조에서 정한 간병의 범위를 벗어난 업무의
            제공을 요구하여서는 아니된다.
          </p>
          <p>
            ⑤ 구인자는 간병인이 24시간 연속 근무를 할 경우 간병에 지장이 없는
            선에서 수면을 취하도록 하여야 한다.
          </p>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제7조(계약해지)</strong>①
            구인자와 간병인은 상호합의 하에 간병 계약을 해지할 수 있으며, 이
            경우 해지의 의사표시를 상대방에게 명시적으로 통지하고 위약금을
            지급하여야 한다.
          </p>
          <p>
            ② 위약금은 당사자간 별도 약정이 없는 경우 잔여기간 이용 요금의 10%로
            한다. 다만 병원의 지시에 의한 환자의 퇴원, 사망, 상대방의 계약 의무
            위반 등으로 인해 간병서비스의 목적을 달성할 수 없는 경우에는 위약금
            없이 계약해지를 할 수 있다.
          </p>
          <p>
            ➂ 제1항과 제2항에도 불구하고 당사자간 별도 약정이 있는 경우 그것을
            따른다.
          </p>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">
              제8조(사고 발생 및 손해배상)
            </strong>
            ① 간병인은 업무 수행 중 환자의 건강상태에 중요한 변동 이 발생한
            경우, 즉시 담당 의료인과 이용자에게 그 내용을 알려야 한다.
          </p>
          <p>
            ② 중개업체는 이 계약의 이행과정에서 발생한 사고를 배상하기 위하여
            배상책임보험에 가입하여야 한다.
          </p>
        </div>

        <div className="contract-terms">
          <p>
            <strong className="contract-terms-title">제9조(기타)</strong>① 이
            계약서에 규정하지 않은 사항에 다툼이 있는 경우 당사자간 충분한 상호
            협의하에 해결함을 원칙으로 하되, 합의되지 않을 경우 관계 법령 및
            사회상규에 따른다.
          </p>
          <p>
            ② 이 계약과 관련하여 분쟁이 발생하는 경우 당사자는 민사소송법에 따른
            관할 법원에 소송을 제기할 수 있다.
          </p>
        </div>

        <p>
          위와 같이 계약을 체결하고 본 계약의 체결을 증명하기 위하여 간병인 및
          구인자는 서명을 날인한 후 계약서를 내려받아 개인 저장장치에 보관한다.
          중개업체는 계약 종료일 이후를 기점으로 서버에 본 계약서를 1년간
          보관한다.
        </p>

        <div className="contract-footer">
          <p>{`작성일자 : ${format(createdDate, 'yyyy년 MM월 dd일')}`}</p>
          <p>중개업체 : 페이션트팔</p>
          <p>{`간병인 : ${caregiverData.name}`}</p>
          <p>{`구인자 : ${patientData.name}`}</p>
        </div>
        <span
          className={`absolute left-1/2 top-[10%] -translate-x-1/2 select-none text-9xl text-[rgba(0,0,0,0.2)]`}
        >
          견 본
        </span>
        <span
          className={`absolute left-1/2 top-[30%] -translate-x-1/2 select-none text-9xl text-[rgba(0,0,0,0.2)]`}
        >
          견 본
        </span>
        <span
          className={`absolute left-1/2 top-[60%] -translate-x-1/2 select-none text-9xl text-[rgba(0,0,0,0.2)]`}
        >
          견 본
        </span>
        <span
          className={`absolute left-1/2 top-[90%] -translate-x-1/2 select-none text-9xl text-[rgba(0,0,0,0.2)]`}
        >
          견 본
        </span>
      </div>
    </div>
  );
}
