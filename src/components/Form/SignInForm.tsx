import { SignInFormData, useForm } from '../../hooks/useForm';
import Button from '../common/Button';
import FormCheckbox from './FormCheckbox';
import FormInput from './FormInput';

export default function SignInForm() {
  const [formData, handleChange, handleSubmit] =
    useForm<SignInFormData>('signIn');

  return (
    <>
      <p className="text-text-medium text-gray-medium">
        서비스를 이용하시려면 로그인이 필요합니다.
      </p>
      <p className="text-text-medium text-negative">에러메세지 표시구역</p>
      <form
        className="flex w-full flex-col items-start gap-3"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <FormInput
            className="mt-2.5 w-full"
            type="text"
            label="아이디"
            id="username"
            name="username"
            value={formData.username}
            required
            onChange={handleChange}
          />
          <FormInput
            className="my-2.5 w-full"
            type="password"
            label="비밀번호"
            id="password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
          />
          <FormCheckbox
            label="아이디 저장"
            id="isRememberId"
            name="isRememberId"
            value="remember"
            checked={formData.isRememberId}
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
