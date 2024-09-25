import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import SocialLoginButtonSet from '../../components/common/SocialLoginButtonSet';
import SignInForm from '../../components/Form/auth/SignInForm';

export function Component() {
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
      </div>

      <SignInForm />

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

Component.displayName = 'SignIn';
