import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_FAILED } from '@/constants/api';
import { useAuthStore } from '@/store/useAuthStore';
import { memberService } from '@/services';
import { GetRecommendUserDataResponse } from '@/types/api/member';
import Card from './Card';

function UserRecommendation() {
  const { user, accessToken } = useAuthStore();
  const [recommendUserData, setRecommendUserData] = useState<
    GetRecommendUserDataResponse[keyof GetRecommendUserDataResponse] | null
  >(null);
  const [error, setError] = useState<{
    type: string;
    message: string;
    path: string;
    hoverMessage: string;
  } | null>(null);
  const containerRef = useRef(null);
  const getRecommendUserData = async () => {
    const myRole = user && user.role;
    const isCompleteProfile = user && !user.isCompleteProfile;
    if (!myRole)
      return setError({
        type: 'auth',
        message: '로그인 후 조회가 가능합니다.',
        path: '/auth/signin',
        hoverMessage: '로그인하러 가기',
      });
    if (isCompleteProfile)
      return setError({
        type: 'profile',
        message: '프로필 작성이 필요합니다.',
        path: '/mypage/profile',
        hoverMessage: '프로필 작성하러 가기',
      });
    const response = await memberService.getRecommendUserData(myRole, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === API_FAILED)
      return setError({
        type: response.data.code as string,
        message: response.data.message as string,
        path: '.',
        hoverMessage: response.data.message as string,
      });
    return response.data;
  };
  useEffect(() => {
    getRecommendUserData().then((res) => {
      if (res) {
        const data = Object.values(res)[0];
        setRecommendUserData(data);
      }
    });
  }, []);
  return (
    <>
      {recommendUserData && !error && (
        <div
          className="relative flex h-[230px] w-full items-center overflow-hidden"
          ref={containerRef}
        >
          <div className="absolute left-0 z-10 h-full w-10 bg-[url('/assets/chevron_left.svg')] bg-center bg-no-repeat"></div>
          <motion.div
            className="flex items-center gap-4"
            drag="x"
            dragConstraints={containerRef}
          >
            {recommendUserData.map((values) => {
              const fullAddress = `${values.address.addr} ${values.address.addrDetail}`;
              const years =
                'experienceYears' in values
                  ? values.experienceYears
                  : undefined;
              return (
                <Card.Recommend
                  key={values.id}
                  memberId={values.id}
                  name={values.name}
                  age={values.age}
                  gender={values.gender}
                  image={values.image}
                  experienceYears={years}
                  address={fullAddress}
                />
              );
            })}
          </motion.div>
          <div className="absolute right-0 z-10 h-full w-10 bg-[url('/assets/chevron_right.svg')] bg-center bg-no-repeat"></div>
        </div>
      )}
      {error && (
        <div className="flex h-[230px] w-full items-center justify-center rounded-lg bg-[url('/assets/user_recommend_blur.png')]">
          <Link
            to={error.path}
            className="relative h-11 w-[400px] overflow-hidden rounded-lg border border-primary bg-white px-2 py-1 text-text-xlarge font-semibold shadow-lg transition-all hover:bg-primary [&:hover>span]:-translate-y-[100%] [&:hover>span]:text-white"
          >
            <span className="absolute flex h-full w-full flex-col text-center transition-all">
              <span className="h-full shrink-0">{error.message}</span>
              <span className="h-full shrink-0">{error.hoverMessage}</span>
            </span>
          </Link>
        </div>
      )}
    </>
  );
}

export default UserRecommendation;
