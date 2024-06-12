import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import Button from '../../common/Button';
import FormCheckbox from '../FormCheckbox';
import FormInput from './FormInput';
import FormAlertErrorBox from './FormAlertErrorBox';
import { SignInFormData } from '../../../types/formData.interface';
import { userIdFromLocalStorage } from '../../../utils/getUserIdFromLocalStorage';

const initialFormData: SignInFormData = {
  username: userIdFromLocalStorage.get() || '',
  password: '',
  isRememberId: !!userIdFromLocalStorage.get(),
};

export default function SignInForm() {
  const {
    formData,
    handler: { onChange: handleChange, onSubmit: handleSubmit },
  } = useForm<SignInFormData>(initialFormData);
  const [error, setError] = useState({ isShow: false, message: '' });
  const { username, password, isRememberId } = formData;

  const isFill = (...rest: string[]): boolean => {
    return rest.every((value) => value !== '');
  };

  const signIn = async () => {
    if (!isRememberId) userIdFromLocalStorage.remove();
    else userIdFromLocalStorage.set(username);
    if (!isFill(username, password))
      return setError({
        isShow: true,
        message: '아이디 또는 비밀번호를 입력해주세요.',
      });
    // 로그인 api 호출
    alert('로그인 성공');
    setError({ isShow: false, message: '' });
  };
  return (
    <>
      <p className="text-text-medium text-gray-medium">
        서비스를 이용하시려면 로그인이 필요합니다.
      </p>
      {error.isShow && <FormAlertErrorBox>{error.message}</FormAlertErrorBox>}
      <form
        className="flex w-full flex-col items-start gap-3"
        onSubmit={(e) => handleSubmit(e, signIn)}
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
