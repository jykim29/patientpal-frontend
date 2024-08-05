import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

import { SignInFormData } from '@/types/formData.interface';
import Button from '@/components/common/Button';
import { authService } from '@/services/AuthService';
import { API_FAILED } from '@/constants/api';

import FormInput from './FormInput';
import FormAlertErrorBox from './FormAlertErrorBox';
import FormCheckbox from '../FormCheckbox';

export default function SignInForm() {
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: cookies['rememberId'] || '',
      password: '',
      isRememberId: cookies['rememberId'],
    },
    reValidateMode: 'onSubmit',
  });
  const navigate = useNavigate();
  const errorMessageArray = Object.values(errors).map(({ message }) => message);

  const submitCallback = async (formData: SignInFormData) => {
    const { username, password, isRememberId } = formData;

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
      return setLoginErrorMessage('통신 중 오류가 발생했습니다.');
    if (!isRememberId)
      removeCookie('rememberId', {
        path: '/',
      });
    else
      setCookie('rememberId', username, {
        path: '/',
        expires: new Date('2099-12-31'),
      });
    return navigate('/');
  };

  return (
    <>
      <p className="text-text-medium text-gray-medium">
        서비스를 이용하시려면 로그인이 필요합니다.
      </p>

      {loginErrorMessage && (
        <FormAlertErrorBox>{loginErrorMessage}</FormAlertErrorBox>
      )}
      {errorMessageArray.length > 0 && (
        <FormAlertErrorBox>{errorMessageArray[0] as string}</FormAlertErrorBox>
      )}
      <form
        className="flex w-full flex-col items-start gap-3"
        onSubmit={handleSubmit(submitCallback, () =>
          setLoginErrorMessage(null)
        )}
      >
        <div className="w-full">
          <FormInput
            className="mt-2.5 w-full"
            type="text"
            label="아이디"
            id="username"
            {...register('username', {
              required: '아이디를 입력해주세요.',
            })}
          />
          <FormInput
            className="my-2.5 w-full"
            type="password"
            label="비밀번호"
            id="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
            })}
          />
          <FormCheckbox
            label="아이디 저장"
            id="isRememberId"
            value="remember"
            {...register('isRememberId')}
          />
        </div>

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
    </>
  );
}
