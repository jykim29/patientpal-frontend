import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FormCheckbox, FormInput } from '../../components/Form';
import { userIdFromLocalStorage } from '../../utils/getUserIdFromLocalStorage';
import Button from '../../components/common/Button';
import SocialLoginButtonSet from '../../components/common/SocialLoginButtonSet';

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: userIdFromLocalStorage.get() || '',
    password: '',
    isRememberId: !!userIdFromLocalStorage.get(),
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.isRememberId) userIdFromLocalStorage.remove();
      else userIdFromLocalStorage.set(formData.username);
      console.log(formData);
    },
    [formData]
  );

  return (
    <motion.div
      initial={{ opacity: 0, width: '560px' }}
      animate={{ opacity: 1, width: '440px' }}
      transition={{
        width: { duration: 0.2 },
        opacity: { delay: 0.2, duration: 0.3 },
      }}
      className="flex w-[55%] flex-col items-start justify-between p-12"
    >
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-title-medium">로그인</h2>
        <p className="text-text-medium text-gray-medium">
          서비스를 이용하시려면 로그인이 필요합니다.
        </p>
        <p className="text-text-medium text-negative">에러메세지 표시구역</p>
      </div>

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

      <div className="flex w-full items-center justify-center gap-1">
        <div className="h-[1px] w-full bg-gray-light-medium"></div>
        <span className="px-2 text-text-medium text-gray-medium">or</span>
        <div className="h-[1px] w-full bg-gray-light-medium"></div>
      </div>

      <SocialLoginButtonSet type="vertical" />

      <p className="w-full text-center text-text-medium">
        계정이 없으신가요?
        <Link className="ml-2 text-primary underline" to={'/auth/signup'}>
          회원가입
        </Link>
      </p>
    </motion.div>
  );
}
