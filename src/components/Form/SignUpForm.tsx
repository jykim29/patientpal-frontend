import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

import FormInput from './FormInput';
import { SignUpFormData, useForm } from '../../hooks/useForm';
import Button from '../common/Button';
import FormCheckbox from './FormCheckbox';

export default function SignUpForm() {
  const [formData, handleChange, handleSubmit] =
    useForm<SignUpFormData>('signUp');
  const [step, setStep] = useState<number>(0);

  const { role, username, password, passwordConfirm, contact } = formData;

  const handleClickStepChange = useCallback(() => {
    if (step === 0) setStep((prev) => prev + 1);
    if (step === 1) setStep((prev) => prev - 1);
  }, [step]);

  return (
    <>
      <h3 className="text-text-large font-semibold">
        {step === 0 && '회원 유형을 선택해주세요. (1/2)'}
        {step === 1 && '회원 정보를 입력해주세요. (2/2)'}
      </h3>
      <p className="text-text-medium text-negative">에러메세지 표시구역</p>

      <form
        onSubmit={handleSubmit}
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
                  <figcaption>일반 회원</figcaption>
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
                onChange={handleChange}
              />
              <Button className="h-full w-[80px] px-1 py-1" type="button">
                중복확인
              </Button>
              <div className="input-validation-message-box invisible ml-2 w-[150px] peer-focus-within:visible">
                <span>툴팁 메세지</span>
              </div>
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="password"
                label="비밀번호"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <div className="input-validation-message-box invisible ml-2 w-[150px] peer-focus-within:visible">
                <span>툴팁 메세지</span>
              </div>
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="password"
                label="비밀번호 확인"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={handleChange}
              />
              <div className="input-validation-message-box invisible ml-2 w-[150px] peer-focus-within:visible">
                <span>툴팁 메세지</span>
              </div>
            </div>
            <div className="mt-2.5 flex w-full gap-1">
              <FormInput
                className="peer flex-1"
                type="text"
                label="휴대폰 번호"
                name="contact"
                value={contact}
                onChange={handleChange}
              />
              <Button className="h-full w-[80px] px-1 py-1" type="button">
                인증요청
              </Button>
              <div className="input-validation-message-box invisible ml-2 w-[150px] peer-focus-within:visible">
                <span>툴팁 메세지</span>
              </div>
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
