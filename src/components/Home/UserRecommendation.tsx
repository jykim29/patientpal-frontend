import { useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef(null);
  const getRecommendUserData = async () => {
    const myRole = user && user.role;
    if (!myRole) return null;
    const response = await memberService.getRecommendUserData(myRole, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === API_FAILED) return null;
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
      {recommendUserData ? (
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
      ) : (
        <div className="flex h-[230px] w-full items-center justify-center bg-[url('/assets/user_recommend_blur.png')]">
          <p className="rounded-lg border border-primary bg-white px-2 py-1 text-text-xlarge font-semibold shadow-lg">
            로그인 후 조회가 가능합니다.
          </p>
        </div>
      )}
    </>
  );
}

export default UserRecommendation;
