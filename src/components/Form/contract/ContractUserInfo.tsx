import { GetMatchUserInfoResponse } from '@/types/api/match';

export default function ContractUserInfo({
  matchUserInfo,
}: {
  matchUserInfo: GetMatchUserInfoResponse;
}) {
  const {
    caregiverName,
    caregiverAge,
    caregiverAddress,
    caregiverContact,
    caregiverExperienceYears,
    caregiverSignificant,
    isNok,
    nokName,
    nokContact,
    patientName,
    patientAge,
    patientAddress,
    patientContact,
    patientSignificant,
  } = matchUserInfo;

  return (
    <>
      <p className="my-2 text-text-large font-semibold">1. 인적사항 확인</p>
      <p className="my-2 text-text-small text-gray-medium-dark">
        ※ 환자/보호자와 간병인의 인적사항을 꼼꼼히 확인해주세요.
      </p>
      <div className="mb-5 flex w-full justify-center gap-36 rounded-lg border border-secondary px-6 py-5">
        <div className="w-[400px]">
          <span className="mb-2 inline-block min-w-14 rounded-lg border border-secondary bg-secondary px-3 py-[2px] font-semibold text-white">
            이용자
          </span>
          <ul className="flex flex-col justify-center gap-1">
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">성 명</span>
              <span>{patientName}</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">나 이</span>
              <span>{patientAge} 세</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">주 소</span>
              <span>{`${patientAddress?.addr ?? ''} ${patientAddress?.addrDetail ?? ''}`}</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">연락처</span>
              <a href={`tel:${patientContact}`}>{patientContact}</a>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">특이사항</span>
              <span>{patientSignificant}</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">보호자</span>
              <span>{isNok ? `${nokName} / ${nokContact}` : '없음'}</span>
            </li>
          </ul>
        </div>

        <div className="w-[400px]">
          <span className="mb-2 inline-block min-w-14 rounded-lg border border-secondary bg-secondary px-3 py-[2px] font-semibold text-white">
            간병인
          </span>
          <ul className="flex flex-col justify-center gap-1">
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">성 명</span>
              <span>{caregiverName}</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">나 이</span>
              <span>{caregiverAge} 세</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">주 소</span>
              <span>{`${caregiverAddress?.addr ?? ''}, ${caregiverAddress?.addrDetail ?? ''}`}</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">연락처</span>
              <a href={`tel:${caregiverContact}`}>{caregiverContact}</a>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">경 력</span>
              <span>{caregiverExperienceYears}년</span>
            </li>
            <li className="field-group row border-b border-b-gray-light-medium">
              <span className="label">특이사항</span>
              <span>{caregiverSignificant}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
