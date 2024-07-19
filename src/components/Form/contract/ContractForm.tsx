import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { ContractFormData } from '@/types/formData.interface';
import { convertDatetime } from '@/utils/convertDatetime';
import FormAlertErrorBox from '../auth/FormAlertErrorBox';

const initialContractFormData: ContractFormData = {
  startDate: convertDatetime(new Date().getTime())[0],
  endDate: '',
  days: [],
  startTime: '0',
  endTime: '0',
  location: 'home',
  etc: '',
};

export default function ContractForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...initialContractFormData,
    },
    mode: 'onSubmit',
  });
  const errorMessageArray = Object.values(errors).map(({ message }) => message);
  return (
    <form
      onSubmit={handleSubmit((data) => {
        const { startDate, endDate, startTime, endTime } = data;
        if (new Date(endDate).getTime() - new Date(startDate).getTime() < 0)
          return setError('root', {
            message: '시작 날짜와 종료 날짜가 올바르지 않습니다.',
          });
        if (Number(endTime) - Number(startTime) <= 0)
          return setError('root', {
            message: '시작 시간과 종료 시간이 올바르지 않습니다.',
          });
        alert(JSON.stringify(data));
      })}
    >
      <fieldset className="w-full rounded-lg border border-secondary px-6 py-5">
        <legend className="rounded-lg border border-secondary bg-secondary px-3 py-[2px] font-semibold text-white">
          계약 사항
        </legend>

        {errorMessageArray.length > 0 && (
          <FormAlertErrorBox>{errorMessageArray[0]}</FormAlertErrorBox>
        )}
        <div role="group" className="field-group row">
          <span className="label">기 간</span>
          <label htmlFor="startDate" className="sr-only">
            시작 날짜
          </label>
          <input
            className="input"
            type="date"
            id="startDate"
            placeholder="시작 날짜"
            {...register('startDate', {
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
            {...register('endDate', {
              required: '종료날짜를 지정해주세요.',
              validate: {
                isValidFormat: (value) => {
                  const date = new Date(value).getTime();
                  return !Number.isNaN(date) || '정상적인 값이 아닙니다.';
                },
              },
            })}
          />
          <span className="text-text-small text-negative">(총 00일)</span>
        </div>

        <div role="group" className="field-group row mt-3">
          <span className="label">요 일</span>
          <div className="flex items-center gap-1">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day}>
                <input
                  className="peer sr-only"
                  type="checkbox"
                  id={day}
                  value={day}
                  {...register('days', {
                    validate: {
                      atLeastOne: (values) =>
                        values.length > 0 ||
                        '적어도 한개의 요일을 선택해주세요.',
                    },
                  })}
                />
                <label
                  htmlFor={day}
                  className="block h-[26px] w-[26px] cursor-pointer select-none rounded-full border border-gray-light-medium bg-gray-light text-center text-gray-medium-dark peer-checked:border-none peer-checked:bg-secondary peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-secondary"
                >
                  {day}
                </label>
              </div>
            ))}
          </div>

          <span className="text-text-small text-negative">(주 0일)</span>
        </div>

        <div role="group" className="field-group row mt-3">
          <span className="label">시 간</span>
          <select
            className="input"
            id="startTime"
            {...register('startTime', {
              validate: {
                isValidFormat: (value) => {
                  if (Number(value) < 0 || Number(value) > 23) {
                    return '정상적인 값이 아닙니다.';
                  }
                  return true;
                },
              },
            })}
          >
            {new Array(24).fill(0).map((value, index) => {
              const label = String(value + index).padStart(2, '0');
              return (
                <option key={label} value={value + index}>
                  {label}
                </option>
              );
            })}
          </select>
          <span>시</span>
          <span>~</span>
          <label htmlFor="endTime" className="sr-only">
            종료 시간
          </label>
          <select
            className="input"
            id="endTime"
            {...register('endTime', {
              validate: {
                isValidFormat: (value) => {
                  if (Number(value) < 0 || Number(value) > 23) {
                    return '정상적인 값이 아닙니다.';
                  }
                  return true;
                },
              },
            })}
          >
            {new Array(24).fill(0).map((value, index) => {
              const label = String(value + index).padStart(2, '0');
              return (
                <option key={label} value={value + index}>
                  {label}
                </option>
              );
            })}
          </select>
          <span>시</span>
          <span className="text-text-small text-negative">(일 00시간)</span>
        </div>

        <div role="group" className="field-group row mt-3">
          <span className="label">장 소</span>
          <input
            type="radio"
            id="home"
            value="home"
            {...register('location', {
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
            {...register('location')}
          />
          <label htmlFor="hospital">병원</label>
        </div>

        <div role="group" className="field-group col mt-3">
          <span className="label">기타사항</span>
          <label htmlFor="etc" className="sr-only">
            기타사항
          </label>
          <textarea
            className="mt-2 block w-full resize-none rounded-lg border border-gray-medium p-2 outline-none focus-within:border-primary"
            id="etc"
            rows={5}
            placeholder="내용을 입력해주세요."
            spellCheck={false}
            {...register('etc')}
          ></textarea>
        </div>
      </fieldset>

      <div className="mt-3 flex items-center justify-end gap-2">
        <Button type="button" className="bg-gray-medium px-3 py-1">
          임시저장
        </Button>
        <Button type="submit" className="px-3 py-1">
          전송
        </Button>
      </div>
    </form>
  );
}
