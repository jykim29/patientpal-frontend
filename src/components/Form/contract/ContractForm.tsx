import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import Button from '@/components/common/Button';
import { ContractFormData } from '@/types/formData.interface';
import { UserRole } from '@/types/user';
import { SendRequestBody } from '@/types/api/match';
import { convertDatetime } from '@/utils/convertDatetime';
import { matchService } from '@/services/MatchService';
import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';
import { useModal } from '@/hooks/useModal';

import FormAlertErrorBox from '../auth/FormAlertErrorBox';

const initialContractFormData: ContractFormData = {
  USER: {
    careStartDateTime: format(new Date(), 'yyyy-MM-dd'),
    careEndDateTime: '',
    totalAmount: 0,
    significant: '',
    realCarePlace: '',
    isNok: 'false',
  },
  CAREGIVER: {
    careStartDateTime: convertDatetime(new Date().getTime())[0],
    careEndDateTime: '',
    totalAmount: 0,
    significant: '',
  },
};

export default function ContractForm({ memberId = '' }: { memberId?: string }) {
  const { accessToken, user } = useAuthStore();
  const { confirm, alert } = useModal();
  const myRole = user?.role as UserRole;
  const {
    register,
    handleSubmit,
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
    if (!(await confirm('정말 전송하시겠습니까?'))) return;

    const requestBody: SendRequestBody['USER'] | SendRequestBody['CAREGIVER'] =
      {
        ...data,
        careStartDateTime: new Date(data.careStartDateTime).toISOString(),
        careEndDateTime: new Date(
          `${data.careEndDateTime}T23:59:59Z`
        ).toISOString(),
        totalAmount: Number(data.totalAmount),
      };
    if (myRole === 'USER')
      (requestBody as SendRequestBody['USER']).isNok = JSON.parse(
        (data as ContractFormData['USER']).isNok
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
    if (response?.status === API_FAILED)
      return await alert('warning', response.data.message as string);
    await alert('success', '계약서 전송이 완료되었습니다.');
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
                {...register('isNok', {
                  validate: {
                    isValidValue: (value) => {
                      if (value === 'true' || value === 'false') return true;
                      return '정상적인 값이 아닙니다.';
                    },
                  },
                })}
              />
              <label htmlFor="me">본인</label>
              <input
                type="radio"
                id="nok"
                value="true"
                {...register('isNok')}
              />
              <label htmlFor="nok">보호자</label>
            </div>
          )}

          {/* 기간 */}
          <div className="field-group row mt-3">
            <span className="label">기 간</span>
            <input
              aria-label="시작 날짜"
              className="input"
              type="date"
              id="startDate"
              placeholder="시작 날짜"
              min={format(new Date(), 'yyyy-MM-dd')}
              {...register('careStartDateTime', {
                required: '시작날짜를 지정해주세요.',
                validate: {
                  validateFormat: (value) => {
                    const date = new Date(value).getTime();
                    return !Number.isNaN(date) || '정상적인 값이 아닙니다.';
                  },
                  validateValue: (value) => {
                    const todayDate = format(new Date(), 'yyyyMMdd');
                    const inputDate = format(new Date(value), 'yyyyMMdd');
                    return Number(inputDate) - Number(todayDate) < 0
                      ? '시작 날짜는 오늘보다 과거일 수 없습니다.'
                      : true;
                  },
                },
              })}
            />
            <span>~</span>
            <input
              aria-label="종료 날짜"
              className="input"
              type="date"
              id="endDate"
              placeholder="종료 날짜"
              {...register('careEndDateTime', {
                required: '종료날짜를 지정해주세요.',
                validate: {
                  validateFormat: (value) => {
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
                aria-label="장소"
                className="input w-36"
                type="text"
                id="realCarePlace"
                {...register('realCarePlace', {
                  required: '장소를 입력해주세요.',
                })}
              />
            </div>
          )}

          {/* 금액 */}
          <div className="field-group row mt-3">
            <span className="label">금 액</span>
            <input
              aria-label="금액"
              className="input w-28 text-right"
              type="number"
              id="totalAmount"
              min={0}
              {...register('totalAmount', {
                required: '금액을 입력해주세요.',
                validate: {
                  minValue: (value) =>
                    Number(value) > 0 || '금액은 0원보다 높아야 합니다.',
                },
              })}
            />
            <span>원</span>
          </div>

          {/* 특이사항 */}
          <div className="field-group col mt-3">
            <span className="label">특이사항</span>
            <textarea
              aria-label="특이사항"
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
          <Button type="submit" className="px-3 py-1">
            전송
          </Button>
        </div>
      </form>
    </>
  );
}
