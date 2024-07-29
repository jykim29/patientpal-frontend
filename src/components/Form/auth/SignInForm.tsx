import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInFormData } from '@/types/formData.interface';
import { userIdFromLocalStorage } from '@/utils/getUserIdFromLocalStorage';
import Button from '@/components/common/Button';
import { Validate, useForm } from '@/hooks/useForm';
import { authService } from '@/services/AuthService';
import { API_FAILED } from '@/constants/api';

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
  const navigate = useNavigate();
  const { username, password, isRememberId } = formData;
  const validateErrorArray = [...error.values()];

  const submitCallback = async () => {
    const { username, password } = formData;
    setLoginErrorMessage(null);
    if (!isRememberId) userIdFromLocalStorage.remove();
    else userIdFromLocalStorage.set(username);

    const signInResponse = await authService.signInWithIdPassword({
      username,
      password,
    });
    if (signInResponse.status === API_FAILED)
      return setLoginErrorMessage(signInResponse.data.message as string);
    const getUserDataResponse = await authService.getUserData(
      signInResponse.data.access_token,
      {
        headers: {
          Authorization: `Bearer ${signInResponse.data.access_token}`,
        },
      }
    );
    if (getUserDataResponse.status === API_FAILED)
      return setLoginErrorMessage('서버와 통신 중 오류가 발생했습니다.');
    return navigate('/');
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
        onSubmit={(e) => handleSubmit(e, submitCallback)}
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
      </form>
    </>
  );
}
