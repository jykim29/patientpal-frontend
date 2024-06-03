import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import SocialLoginButtonSet from '../../components/common/SocialLoginButtonSet';
import Button from '../../components/common/Button';
import { FormCheckbox, FormInput } from '../../components/Form';

interface SignUpForm {
  role: 'user' | 'caregiver';
  username: string;
  password: string;
  passwordConfirm: string;
  contact: string;
  agreement: { temrOfUse: boolean; personalInformation: boolean };
}

/*
  TODO
  1. 아이디, 비밀번호, 비밀번호확인 validation 기능 구현
  2. 비밀번호 security level check 기능 구현
*/
export default function SignUp() {
  const [step, setStep] = useState<number>(0);
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    role: 'user',
    username: '',
    password: '',
    passwordConfirm: '',
    contact: '',
    agreement: {
      temrOfUse: false,
      personalInformation: false,
    },
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.currentTarget;
    if (e.currentTarget.type === 'checkbox') {
      setSignUpForm((prev) => ({
        ...prev,
        agreement: { ...prev.agreement, [name]: checked },
      }));
    } else setSignUpForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { role, username, password, passwordConfirm, contact, agreement } =
        signUpForm;
      if (Object.values(agreement).includes(false)) return alert('모두 체크');
      alert(JSON.stringify(signUpForm));
    },
    [signUpForm]
  );

  const handleClickStepChange = () => {
    if (step === 0) setStep((prev) => prev + 1);
    if (step === 1) setStep((prev) => prev - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, width: '440px' }}
      animate={{ opacity: 1, width: '560px' }}
      transition={{
        width: { duration: 0.2 },
        opacity: { delay: 0.2, duration: 0.3 },
      }}
      className="flex w-[70%] flex-col items-start justify-between px-12 py-10"
    >
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-title-medium">회원가입</h2>
        <p className="text-text-medium text-gray-medium">
          PatienPal에 가입하고 다양한 간병 서비스를 이용해보세요.
        </p>
        <h3 className="text-text-large font-semibold">
          회원 유형을 선택해주세요.
        </h3>
        <p className="text-text-medium text-negative">에러메세지 표시구역</p>
      </div>

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
                value="user"
                checked={signUpForm.role === 'user'}
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
                value="caregiver"
                checked={signUpForm.role === 'caregiver'}
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
              <FormInput
                className="peer flex-1"
                type="text"
                label="아이디"
                name="username"
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
                id="temrOfUse"
                name="temrOfUse"
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

      <div className="flex w-full items-center justify-center gap-1">
        <div className="h-[1px] w-full bg-gray-light-medium"></div>
        <span className="px-2 text-text-medium text-gray-medium">or</span>
        <div className="h-[1px] w-full bg-gray-light-medium"></div>
      </div>

      <SocialLoginButtonSet type="horizontal" />

      <p className="w-full text-center text-text-medium">
        이미 가입하셨나요?
        <Link className="ml-2 text-primary underline" to={'/auth/signin'}>
          로그인
        </Link>
      </p>
    </motion.div>
  );
}
