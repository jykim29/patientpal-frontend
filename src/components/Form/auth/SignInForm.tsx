import { useState } from 'react';

import { SignInFormData } from '@/types/formData.interface';
import { userIdFromLocalStorage } from '@/utils/getUserIdFromLocalStorage';
import Button from '@/components/common/Button';
import { Validate, useForm } from '@/hooks/useForm';
import { getRefreshToken, signIn } from '@/api/auth';

import FormInput from './FormInput';
import FormAlertErrorBox from './FormAlertErrorBox';
import FormCheckbox from '../FormCheckbox';

const initialFormData: SignInFormData = {
  username: userIdFromLocalStorage.get() || '',
  password: '',
  isRememberId: !!userIdFromLocalStorage.get(),
};
const validate: Validate<SignInFormData> = (values) => {
  const { username, password } = values;
  const errors = new Map();
  if (username === '') errors.set('username', '아이디를 입력해주세요.');
  if (password === '') errors.set('password', '비밀번호를 입력해주세요.');
  return errors;
};

export default function SignInForm() {
  const {
    formData,
    handler: { onChange: handleChange, onSubmit: handleSubmit },
    error,
  } = useForm<SignInFormData>(initialFormData, validate);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );
  const { username, password, isRememberId } = formData;
  const validateErrorArray = [...error.values()];

  const signInCallback = async () => {
    const { username, password } = formData;

    if (!isRememberId) userIdFromLocalStorage.remove();
    else userIdFromLocalStorage.set(username);
    setLoginErrorMessage(null);
    const response = await signIn({ username, password });
    if (response.result === 'FAIL' && response.data.message) {
      return setLoginErrorMessage(response.data.message);
    }
  };

  const getToken = async () => {
    const response = await getRefreshToken();
    console.log(response);
  };
  return (
    <>
      <p className="text-text-medium text-gray-medium">
        서비스를 이용하시려면 로그인이 필요합니다.
      </p>
      {validateErrorArray.length > 0 && (
        <FormAlertErrorBox>{validateErrorArray[0]}</FormAlertErrorBox>
      )}
      {loginErrorMessage && (
        <FormAlertErrorBox>{loginErrorMessage}</FormAlertErrorBox>
      )}
      <form
        className="flex w-full flex-col items-start gap-3"
        onSubmit={(e) => handleSubmit(e, signInCallback)}
      >
        <div className="w-full">
          <FormInput
            className="mt-2.5 w-full"
            type="text"
            label="아이디"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <FormInput
            className="my-2.5 w-full"
            type="password"
            label="비밀번호"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <FormCheckbox
            label="아이디 저장"
            id="isRememberId"
            name="isRememberId"
            value="remember"
            checked={isRememberId}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full">
          로그인
        </Button>
        <Button type="button" onClick={getToken}>
          토큰재발급
        </Button>
      </form>
    </>
  );
}
