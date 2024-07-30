import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import { ContractFormData } from '@/types/formData.interface';
import { UserRole } from '@/types/user';
import { SendRequestBody } from '@/types/api/match';
import { convertDatetime } from '@/utils/convertDatetime';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';

import FormAlertErrorBox from '../auth/FormAlertErrorBox';

const initialContractFormData: ContractFormData = {
  USER: {
    careStartDateTime: convertDatetime(new Date().getTime())[0],
    careEndDateTime: '',
    totalAmount: 0,
    significant: '',
    realCarePlace: 'home',
    nok: 'false',
  },
  CAREGIVER: {
    careStartDateTime: convertDatetime(new Date().getTime())[0],
    careEndDateTime: '',
    totalAmount: 0,
    significant: '',
  },
};

/*
  TODO : 넣어야 할 기능
  1. user role에 따라 폼 내용 조건부 렌더링 ✅
  2. user role에 따라 전송 API 분기 ✅
  3. 유효성 검증 후 submit 성공✅
  4. 모달을 통해 계약서 디자인에 데이터 바인딩 후 최종 의사 결정⏩
  5. 최종적으로 전송
*/

export default function ContractForm({ memberId = '' }: { memberId?: string }) {
  const { accessToken, user } = useAuthStore();
  const myRole = user?.role as UserRole;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialContractFormData[myRole],
    },
    reValidateMode: 'onSubmit',
  });
  const navigate = useNavigate();
  const errorMessageArray = Object.values(errors).map(({ message }) => message);

  const submitCallback = async (
    data: ContractFormData['USER'] | ContractFormData['CAREGIVER']
  ) => {
    if (memberId === '') return;
    if (!confirm('정말 전송하시겠습니까?')) return;
    if (
      new Date(data.careEndDateTime).getTime() -
        new Date(data.careStartDateTime).getTime() <
      0
    )
      return setError('root', {
        message: '시작 날짜와 종료 날짜가 올바르지 않습니다.',
      });
    const requestBody: SendRequestBody['USER'] | SendRequestBody['CAREGIVER'] =
      {
        ...data,
        careStartDateTime: new Date(data.careStartDateTime).toISOString(),
        careEndDateTime: new Date(data.careEndDateTime).toISOString(),
        totalAmount: Number(data.totalAmount),
      };
    if (myRole === 'USER')
      (requestBody as SendRequestBody['USER']).nok = JSON.parse(
        (data as ContractFormData['USER']).nok
      );

    const response = await matchService.sendContract(
      myRole,
      Number(memberId),
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response?.status === API_FAILED) alert(response.data.message);
    else alert('계약서 전송이 완료되었습니다.');
    return navigate('/mypage/match-record', { replace: true });
  };

  return (
    <>
      <p className="my-2 text-text-large font-semibold">2. 계약정보 입력</p>
      <p className="my-2 text-text-small text-gray-medium-dark">
        ※ 모든 입력 항목을 빠짐없이 작성해주세요.
      </p>

      <form onSubmit={handleSubmit(submitCallback)}>
        {errorMessageArray.length > 0 && (
          <FormAlertErrorBox>{errorMessageArray[0]}</FormAlertErrorBox>
        )}
        <div className="w-full rounded-lg border border-tertiary px-6 py-4">
          {/* 관계 */}
          {myRole === 'USER' && (
            <div className="field-group row">
              <span className="label">계약자와의 관계</span>
              <input
                type="radio"
                id="me"
                value="false"
                {...register('nok', {
                  validate: {
                    isValidValue: (value) => {
                      if (value === 'true' || value === 'false') return true;
                      return '정상적인 값이 아닙니다.';
                    },
                  },
                })}
              />
              <label htmlFor="me">본인</label>
              <input type="radio" id="nok" value="true" {...register('nok')} />
              <label htmlFor="nok">보호자</label>
            </div>
          )}

          {/* 기간 */}
          <div className="field-group row mt-3">
            <span className="label">기 간</span>
            <label htmlFor="startDate" className="sr-only">
              시작 날짜
            </label>
            <input
              className="input"
              type="date"
              id="startDate"
              placeholder="시작 날짜"
              {...register('careStartDateTime', {
                required: '시작날짜를 지정해주세요.',
                validate: {
                  isValidFormat: (value) => {
                    const date = new Date(value).getTime();
                    return !Number.isNaN(date) || '정상적인 값이 아닙니다.';
                  },
                },
              })}
            />
            <span>~</span>
            <label htmlFor="endDate" className="sr-only">
              종료 날짜
            </label>
            <input
              className="input"
              type="date"
              id="endDate"
              placeholder="종료 날짜"
              {...register('careEndDateTime', {
                required: '종료날짜를 지정해주세요.',
                validate: {
                  isValidFormat: (value) => {
                    const date = new Date(value).getTime();
                    return !Number.isNaN(date) || '정상적인 값이 아닙니다.';
                  },
                },
              })}
            />
          </div>

          {/* 장소 */}
          {myRole === 'USER' && (
            <div className="field-group row mt-3">
              <span className="label">장 소</span>
              <input
                type="radio"
                id="home"
                value="home"
                {...register('realCarePlace', {
                  validate: {
                    isValidValue: (value) => {
                      if (value === 'home' || value === 'hospital') return true;
                      return '정상적인 값이 아닙니다.';
                    },
                  },
                })}
              />
              <label htmlFor="home">자택</label>
              <input
                type="radio"
                id="hospital"
                value="hospital"
                {...register('realCarePlace')}
              />
              <label htmlFor="hospital">병원</label>
            </div>
          )}

          {/* 금액 */}
          <div className="field-group row mt-3">
            <span className="label">금 액</span>
            <label className="sr-only" htmlFor="totalAmount">
              금액
            </label>
            <input
              className="input w-28 text-right"
              type="number"
              id="totalAmount"
              min={0}
              {...register('totalAmount', {
                required: '금액을 입력해주세요.',
                validate: {
                  minValue: (value) => {
                    if (Number(value) <= 0)
                      return '금액 설정은 0원 이상부터 가능합니다.';
                    return true;
                  },
                },
              })}
            />
            <span>원</span>
          </div>

          {/* 특이사항 */}
          <div className="field-group col mt-3">
            <span className="label">특이사항</span>
            <label htmlFor="significant" className="sr-only">
              특이사항
            </label>
            <textarea
              className="mt-2 block w-full resize-none rounded-lg border border-gray-medium p-2 outline-none focus-within:border-primary"
              id="significant"
              rows={5}
              placeholder="내용을 입력해주세요."
              spellCheck={false}
              {...register('significant')}
            ></textarea>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <Button type="button" className="bg-gray-medium px-3 py-1">
            임시저장
          </Button>
          <Button type="submit" className="px-3 py-1">
            전송
          </Button>
        </div>
      </form>
    </>
  );
}
