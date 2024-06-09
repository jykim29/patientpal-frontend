import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { SignUpFormData } from '@/types/formData';
import { Validator, useForm } from '@/hooks/useForm';
import FormAlertErrorBox from './FormAlertErrorBox';
import {
  FormInput,
  FormTooltipMessageBox,
  FormCheckbox,
} from '@/components/Form';
import Button from '@/components/common/Button';

const initialFormData: SignUpFormData = {
  role: 'USER',
  username: '',
  password: '',
  passwordConfirm: '',
  contact: '',
  termOfUse: false,
  personalInformation: false,
};
const validator: Validator<SignUpFormData> = {
  username: {
    regex: '^[a-z0-9]{8,20}$',
    message: '아이디는 알파벳 소문자 또는 숫자가 포함된 8~20자여야 합니다.',
  },
  password: {
    regex: '^(?=.*[a-zA-Z])(?=.*[0-9]|.*[!@#$_-])[A-Za-z0-9!@#$_-]{8,20}$',
    message:
      '비밀번호는 영문 필수, 숫자 또는 특수문자(!,@,#,$,_,-)가 포함된 8~20자여야 합니다.',
  },
  contact: {
    regex: '^010[0-9]{8}$',
    message: '휴대폰 번호는 "010"으로 시작하는 11자리의 숫자여야 합니다.',
  },
};

export default function SignUpForm() {
  const {
    formData,
    handler: { onChange: handleChange, onSubmit: handleSubmit },
    error,
  } = useForm<SignUpFormData>(initialFormData, validator);
  const [step, setStep] = useState<number>(0);
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const {
    role,
    username,
    password,
    passwordConfirm,
    contact,
    termOfUse,
    personalInformation,
  } = formData;
  const {
    username: usernameErr,
    password: passwordErr,
    contact: contactErr,
  } = error;

  // 에러 메세지 설정
  const errorArray = useMemo(() => {
    const { username, password, passwordConfirm, contact } = formData;
    const {
      username: usernameErr,
      password: passwordErr,
      contact: contactErr,
    } = error;
    const tempArray = [];
    if (
      username === '' ||
      password === '' ||
      passwordConfirm === '' ||
      contact === ''
    )
      tempArray.push('모든 항목을 입력해주세요.');
    if (usernameErr) tempArray.push(usernameErr.message);
    if (passwordErr) tempArray.push(passwordErr.message);
    if (password !== passwordConfirm)
      tempArray.push('비밀번호가 일치하지 않습니다.');
    if (contactErr) tempArray.push(contactErr.message);
    if (!(termOfUse && personalInformation))
      tempArray.push('약관에 모두 동의하지 않았습니다.');
    return tempArray;
  }, [formData, error]);

  // 툴팁 메세지 설정
  const tooltipBoxArray = useMemo(
    () => [
      '알파벳 소문자 또는 숫자가 포함된 8~20자',
      '영문 필수, 숫자 또는 특수문자가 포함된 8~20자',
      '비밀번호를 다시 입력해주세요.',
      '010으로 시작하는 11자리의 숫자',
    ],
    []
  );

  const handleClickStepChange = useCallback(() => {
    if (step === 0) {
      if (role !== 'USER' && role !== 'CAREGIVER') return setIsShowError(true);
      setStep((prev) => prev + 1);
    }
    if (step === 1) {
      setStep((prev) => prev - 1);
    }
    setIsShowError(false);
  }, [step, role]);

  const signUp = () => {
    if (errorArray.length > 0) return setIsShowError(true);
    // 회원가입 api 호출
    setIsShowError(false);
  };

  return (
    <>
      <h3 className="text-text-large font-semibold">
        {step === 0 && '회원 유형을 선택해주세요. (1/2)'}
        {step === 1 && '회원 정보를 입력해주세요. (2/2)'}
      </h3>

      {isShowError && step === 0 && (
        <FormAlertErrorBox>잘못된 유형을 선택하였습니다.</FormAlertErrorBox>
      )}
      {isShowError && step === 1 && errorArray.length > 0 && (
        <FormAlertErrorBox>{errorArray[0]}</FormAlertErrorBox>
      )}

      <form
        onSubmit={(e) => handleSubmit(e, signUp)}
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
                checked={role === 'USER'}
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
                checked={role === 'CAREGIVER'}
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
        {/* TODO
          1. FormInput, Button, 검증 메세지 중복코드 최소화
        */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center"
          >
            <div className="flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="text"
                label="아이디"
                name="username"
                value={username}
                isValid={usernameErr?.isValid}
                onChange={handleChange}
              />
              <Button className="h-full w-[80px] px-1 py-1" type="button">
                중복확인
              </Button>
              <FormTooltipMessageBox>
                {tooltipBoxArray[0]}
              </FormTooltipMessageBox>
              {/* {tooltipBoxArray[0]} */}
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="password"
                label="비밀번호"
                name="password"
                value={password}
                isValid={passwordErr?.isValid}
                onChange={handleChange}
              />
              <FormTooltipMessageBox>
                {tooltipBoxArray[1]}
              </FormTooltipMessageBox>
              {/* {tooltipBoxArray[1]} */}
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="password"
                label="비밀번호 확인"
                name="passwordConfirm"
                value={passwordConfirm}
                isValid={password === passwordConfirm}
                onChange={handleChange}
              />
              <FormTooltipMessageBox>
                {tooltipBoxArray[2]}
              </FormTooltipMessageBox>
              {/* {tooltipBoxArray[2]} */}
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="text"
                label="휴대폰 번호"
                name="contact"
                value={contact}
                isValid={contactErr?.isValid}
                onChange={handleChange}
              />
              <Button className="h-full w-[80px] px-1 py-1" type="button">
                인증요청
              </Button>
              <FormTooltipMessageBox>
                {tooltipBoxArray[3]}
              </FormTooltipMessageBox>
              {/* {tooltipBoxArray[3]} */}
            </div>
            <div className="mt-3 flex w-full items-center justify-center gap-5">
              <FormCheckbox
                className="text-text-small"
                label="PatientPal 이용약관 동의"
                id="termOfUse"
                name="termOfUse"
                value="agree"
                onChange={handleChange}
              />
              <FormCheckbox
                label="개인정보 수집이용 동의"
                id="personalInformation"
                name="personalInformation"
                value="agree"
                onChange={handleChange}
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
