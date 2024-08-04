import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SignUpFormData } from '@/types/formData.interface';
import { Validate, useForm } from '@/hooks/useForm';
import { useModal } from '@/hooks/useModal';
import {
  FormInput,
  FormTooltipMessageBox,
  FormCheckbox,
} from '@/components/Form';
import Button from '@/components/common/Button';
import { authService } from '@/services/AuthService';
import { FeedbackModal } from '@/components/Modal';

import FormAlertErrorBox from './FormAlertErrorBox';

const initialFormData: SignUpFormData = {
  role: 'USER',
  username: '',
  password: '',
  passwordConfirm: '',
  termOfUse: false,
  personalInformation: false,
};

const validate: Validate<SignUpFormData> = (values) => {
  const {
    username,
    password,
    passwordConfirm,
    personalInformation,
    termOfUse,
  } = values;
  const regex = {
    username: new RegExp('^[a-z0-9]{8,20}$'),
    password: new RegExp(
      '^(?=.*[a-zA-Z])(?=.*[0-9]|.*[!@#$_-])[A-Za-z0-9!@#$_-]{8,20}$'
    ),
  };
  const errors = new Map();

  if (!regex.username.test(username))
    errors.set(
      'username',
      '아이디는 알파벳 소문자 또는 숫자가 포함된 8~20자여야 합니다.'
    );

  if (!regex.password.test(password))
    errors.set(
      'password',
      '비밀번호는 영문 필수, 숫자 또는 특수문자(!,@,#,$,_,-)가 포함된 8~20자여야 합니다.'
    );

  if (passwordConfirm.trim() === '' || password !== passwordConfirm)
    errors.set('passwordConfirm', '두 비밀번호가 일치하지 않습니다.');

  if (!termOfUse)
    errors.set('termOfUse', 'PatientPal 이용약관에 동의해주세요.');
  if (!personalInformation)
    errors.set('personalInformation', '개인정보 수집이용에 동의해주세요.');
  return errors;
};
type InitialFetchResultState = {
  status: 'SUCCESS' | 'FAILED' | null;
  message: string;
};
const initialFetchResultState: InitialFetchResultState = {
  status: null,
  message: '',
};

export default function SignUpForm() {
  const {
    formData,
    handler: { onChange: handleChange, onSubmit: handleSubmit },
    error,
  } = useForm<SignUpFormData>(initialFormData, validate);
  const { createModal, openModal } = useModal();
  const [step, setStep] = useState<number>(0);
  const [roleErrorMessage, setRoleErrorMessage] = useState<string | null>(null);
  const [fetchResult, setFetchResult] = useState<InitialFetchResultState>(
    initialFetchResultState
  );
  const navigate = useNavigate();
  const validateErrorArray = useMemo(() => [...error.values()], [error]);

  // 툴팁 메세지 설정
  const tooltipBoxArray = useMemo(
    () => [
      '알파벳 소문자 또는 숫자가 포함된 8~20자',
      '영문 필수, 숫자 또는 특수문자가 포함된 8~20자',
      '비밀번호를 다시 입력해주세요.',
    ],
    []
  );

  const handleClickStepChange = useCallback(() => {
    if (step === 0) {
      if (formData.role !== 'USER' && formData.role !== 'CAREGIVER')
        return setRoleErrorMessage(
          '잘못된 회원 유형을 선택하였습니다. 다시 선택해주세요.'
        );
      setStep((prev) => prev + 1);
    }
    if (step === 1) {
      setStep((prev) => prev - 1);
    }
    setRoleErrorMessage(null);
  }, [step, formData.role]);

  const submitCallback = async () => {
    console.log('submitCallback called');
    // 회원가입 api 호출
    const { role, username, password, passwordConfirm } = formData;
    const { data, status } = await authService.signUp({
      role,
      username,
      password,
      passwordConfirm,
    });
    if (status === 'FAILED') {
      setFetchResult({ status, message: data.message as string });
    } else setFetchResult({ status, message: data.message });
    return openModal('signUp');
  };

  return (
    <>
      <h3 className="text-text-large font-semibold">
        {step === 0 && '회원 유형을 선택해주세요. (1/2)'}
        {step === 1 && '회원 정보를 입력해주세요. (2/2)'}
      </h3>

      {roleErrorMessage && step === 0 && (
        <FormAlertErrorBox>{roleErrorMessage}</FormAlertErrorBox>
      )}
      {validateErrorArray.length > 0 && step === 1 && (
        <FormAlertErrorBox>{validateErrorArray[0]}</FormAlertErrorBox>
      )}

      <form
        onSubmit={(e) => handleSubmit(e, submitCallback)}
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
                name="role"
                id="user"
                value="USER"
                checked={formData.role === 'USER'}
                onChange={handleChange}
              />
              <label className="user-type-radio-button" htmlFor="user">
                <figure className="user-type-image-container">
                  <figcaption>일반 사용자</figcaption>
                  <img
                    className="h-[120px]"
                    src="/assets/patient_both.png"
                    alt="휠체어를 탄 노인 남녀"
                  />
                </figure>
              </label>
            </div>
            <div>
              <input
                className="sr-only"
                type="radio"
                name="role"
                id="caregiver"
                value="CAREGIVER"
                checked={formData.role === 'CAREGIVER'}
                onChange={handleChange}
              />
              <label className="user-type-radio-button" htmlFor="caregiver">
                <figure className="user-type-image-container">
                  <figcaption>간병인</figcaption>
                  <img
                    className="h-[120px]"
                    src="/assets/caregiver_both.png"
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
              <div className="peer flex w-[350px] items-center gap-1">
                <FormInput
                  type="text"
                  label="아이디"
                  name="username"
                  value={formData.username}
                  isValid={!error.get('username')}
                  onChange={handleChange}
                />
                <Button className="h-full w-[80px] px-1 py-1" type="button">
                  중복확인
                </Button>
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
                name="password"
                value={formData.password}
                isValid={!error.get('password')}
                onChange={handleChange}
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
                name="passwordConfirm"
                value={formData.passwordConfirm}
                isValid={!error.get('passwordConfirm')}
                onChange={handleChange}
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
                name="termOfUse"
                value="agree"
                onChange={handleChange}
                checked={formData.termOfUse}
              />
              <FormCheckbox
                label="개인정보 수집이용 동의"
                id="personalInformation"
                name="personalInformation"
                value="agree"
                onChange={handleChange}
                checked={formData.personalInformation}
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
      {createModal(
        { modalName: 'signUp', isImportant: fetchResult.status === 'SUCCESS' },
        <FeedbackModal
          iconType={fetchResult.status === 'SUCCESS' ? 'check' : 'warning'}
          buttonType={fetchResult.status === 'SUCCESS' ? 'confirm' : 'cancel'}
          onConfirm={() => {
            navigate('/auth/signin');
          }}
        >
          <span className="break-words font-semibold">
            {fetchResult.message}
          </span>
        </FeedbackModal>
      )}
    </>
  );
}
