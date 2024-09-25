import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { SignUpForm } from '@/components/Form';
import SocialLoginButtonSet from '@/components/common/SocialLoginButtonSet';

export function Component() {
  return (
    <motion.div
      initial={{ opacity: 0, width: '440px' }}
      animate={{ opacity: 1, width: '680px' }}
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
      </div>

      <SignUpForm />

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

Component.displayName = 'SignUp';
