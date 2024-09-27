import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { SignUpFormData } from '@/types/formData.interface';
import { useModal } from '@/hooks/useModal';
import {
  FormInput,
  FormTooltipMessageBox,
  FormCheckbox,
} from '@/components/Form';
import Button from '@/components/common/Button';
import { authService, memberService } from '@/services';
import { API_FAILED } from '@/constants/api';

import FormAlertErrorBox from './FormAlertErrorBox';

const initialFormData: SignUpFormData = {
  role: 'USER',
  username: '',
  password: '',
  passwordConfirm: '',
  termOfUse: false,
  personalInformation: false,
  idDuplicationState: 'require',
};

export default function SignUpForm() {
  const {
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
    reValidateMode: 'onSubmit',
  });
  const { alert } = useModal();
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();
  const errorMessageArray = Object.values(errors).map(({ message }) => message);

  // 툴팁 메세지 설정
  const tooltipBoxArray = useMemo(
    () => [
      '알파벳 소문자 또는 숫자가 포함된 8~20자',
      '영문 필수, 숫자 또는 특수문자가 포함된 8~20자',
      '비밀번호를 다시 입력해주세요.',
    ],
    []
  );
  const isIdCheckPass = getValues('idDuplicationState') === 'pass';

  const handleClickStepChange = useCallback(() => {
    if (step === 0) {
      const role = getValues('role');
      if (role !== 'USER' && role !== 'CAREGIVER')
        setError('role', {
          type: 'validate',
          message: '올바른 회원 유형을 선택해주세요.',
        });
      else {
        clearErrors();
        setStep((prev) => prev + 1);
      }
    }
    if (step === 1) {
      clearErrors();
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleClickDuplicationCheck = useCallback(async () => {
    const username = getValues('username');
    if (username.trim().length === 0) return trigger('idDuplicationState');
    const { data, status } = await memberService.checkUsername(
      getValues('username')
    );
    if (status === API_FAILED) return;
    if (data === false) setValue('idDuplicationState', 'pass');
    else setValue('idDuplicationState', 'fail');
    trigger('idDuplicationState');
  }, []);

  const submitCallback = async (formData: SignUpFormData) => {
    const { role, username, password, passwordConfirm } = formData;
    const { data, status } = await authService.signUp({
      role,
      username,
      password,
      passwordConfirm,
    });
    if (status === 'FAILED') {
      alert('warning', data.message as string);
    }
    alert('success', data.message as string).then((res) => {
      if (res) navigate('/auth/signin');
    });
  };

  useEffect(() => {
    register('idDuplicationState', {
      validate: {
        isPassed: (value) => {
          const username = getValues('username');
          if (username.trim().length === 0) return '아이디를 입력해주세요.';
          if (value === 'require') return '아이디 중복확인이 필요합니다.';
          if (value === 'fail') return '이미 사용중인 아이디입니다.';
          return true;
        },
      },
    });
    watch('idDuplicationState');
  }, []);
  return (
    <>
      <h3 className="text-text-large font-semibold">
        {step === 0 && '회원 유형을 선택해주세요. (1/2)'}
        {step === 1 && '회원 정보를 입력해주세요. (2/2)'}
      </h3>

      {errorMessageArray.length > 0 && (
        <FormAlertErrorBox>{errorMessageArray[0]}</FormAlertErrorBox>
      )}

      <form
        onSubmit={handleSubmit(submitCallback)}
        className="flex w-full flex-col items-start gap-3"
      >
        {/* 1단계 - 간병인 회원 선택 */}
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 mt-5 flex h-[200px] w-full gap-5 [&>div]:flex-1"
          >
            <div>
              <input
                className="sr-only"
                type="radio"
                id="user"
                value="USER"
                {...register('role', {
                  required: '회원 유형을 선택해주세요.',
                })}
              />
              <label className="user-type-radio-button" htmlFor="user">
                <figure className="user-type-image-container">
                  <figcaption>일반 사용자</figcaption>
                  <img
                    className="h-[120px]"
                    src="/assets/images/patient_both.png"
                    alt="휠체어를 탄 노인 남녀"
                  />
                </figure>
              </label>
            </div>
            <div>
              <input
                className="sr-only"
                type="radio"
                id="caregiver"
                value="CAREGIVER"
                {...register('role')}
              />
              <label className="user-type-radio-button" htmlFor="caregiver">
                <figure className="user-type-image-container">
                  <figcaption>간병인</figcaption>
                  <img
                    className="h-[120px]"
                    src="/assets/images/caregiver_both.png"
                    alt="앞치마를 두르고 있는 간병인 남녀"
                  />
                </figure>
              </label>
            </div>
          </motion.div>
        )}
        {/* 2단계 - 가입양식 입력 */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center"
          >
            <div className="flex w-full gap-1">
              <div className="peer relative flex w-[350px] items-center gap-1">
                <FormInput
                  type="text"
                  label="아이디"
                  isValid={!errors.username}
                  {...register('username', {
                    required: '아이디를 입력해주세요.',
                    pattern: {
                      value: /^[a-z0-9]{8,20}$/,
                      message:
                        '아이디는 알파벳 소문자 또는 숫자가 포함된 8~20자여야 합니다.',
                    },
                    onChange: () => setValue('idDuplicationState', 'require'),
                  })}
                />
                <Button
                  className={`h-full w-[80px] px-1 py-1`}
                  type="button"
                  onClick={handleClickDuplicationCheck}
                >
                  중복 확인
                </Button>

                <motion.div
                  key={getValues('idDuplicationState')}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.4, duration: 0.3 }}
                  title={
                    isIdCheckPass
                      ? '해당 아이디는 사용가능합니다.'
                      : '중복 확인이 필요합니다.'
                  }
                  className={twMerge(
                    'absolute right-[95px] flex select-none items-center justify-center rounded-full',
                    isIdCheckPass ? 'text-naver' : 'text-orange'
                  )}
                >
                  <span className="text-text-small font-semibold">
                    {isIdCheckPass ? '사용가능' : ''}
                  </span>
                </motion.div>
              </div>
              <FormTooltipMessageBox>
                {tooltipBoxArray[0]}
              </FormTooltipMessageBox>
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer w-[350px]"
                type="password"
                label="비밀번호"
                isValid={!errors.password}
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9]|.*[!@#$_-])[A-Za-z0-9!@#$_-]{8,20}$/,
                    message:
                      '비밀번호는 영문 필수, 숫자 또는 특수문자(!,@,#,$,_,-)가 포함된 8~20자여야 합니다.',
                  },
                })}
              />
              <FormTooltipMessageBox>
                {tooltipBoxArray[1]}
              </FormTooltipMessageBox>
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer w-[350px]"
                type="password"
                label="비밀번호 확인"
                isValid={!errors.passwordConfirm}
                {...register('passwordConfirm', {
                  required: '비밀번호 확인을 입력해주세요.',

                  validate: {
                    isSameValue: (value) =>
                      getValues('password') === value ||
                      '두 비밀번호가 일치하지 않습니다.',
                  },
                })}
              />
              <FormTooltipMessageBox>
                {tooltipBoxArray[2]}
              </FormTooltipMessageBox>
            </div>
            <div className="mt-3 flex w-full items-center justify-center gap-5">
              <FormCheckbox
                className="text-text-small"
                label="PatientPal 이용약관 동의"
                id="termOfUse"
                {...register('termOfUse', {
                  required: '이용약관 동의에 체크해주세요.',
                })}
              />
              <FormCheckbox
                label="개인정보 수집이용 동의"
                id="personalInformation"
                {...register('personalInformation', {
                  required: '개인정보 수집이용 동의에 체크해주세요.',
                })}
              />
            </div>
          </motion.div>
        )}

        <div className="flex w-full gap-2">
          {step === 0 && (
            <Button
              type="button"
              className="w-full"
              onClick={handleClickStepChange}
            >
              다음 단계로
            </Button>
          )}
          {step === 1 && (
            <>
              <Button
                className="w-[120px] bg-gray-medium"
                type="button"
                onClick={handleClickStepChange}
              >
                이전 단계로
              </Button>
              <Button className="flex-1" type="submit">
                회원가입
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
