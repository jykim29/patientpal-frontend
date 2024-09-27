import { memo } from 'react';
import Button from './Button';

function SocialLoginButtonSet({ type }: { type: 'horizontal' | 'vertical' }) {
  const buttonWrapperClassName =
    type === 'vertical'
      ? 'flex w-full flex-col gap-1.5'
      : 'flex w-full justify-center gap-4';

  /* TODO
    1. buttonContents의 중복코드 최소화
    2. horizontal 타입일 경우 네이버 로고 작은 문제 (Button컴포넌트 패딩 이슈) 
  */
  const buttonContents =
    type === 'vertical' ? (
      <>
        <Button
          type="button"
          className="w-full border border-gray-light-medium bg-white text-black"
        >
          <img
            className="h-5"
            src="/assets/images/logo_google.svg"
            alt="구글 로고"
          />
          <span>Google 계정으로 로그인</span>
        </Button>
        <Button type="button" className="w-full bg-kakao text-black">
          <img
            className="h-5"
            src="/assets/images/logo_kakao.svg"
            alt="카카오 로고"
          />
          <span>카카오 로그인</span>
        </Button>
        <Button type="button" className="w-full bg-naver text-white">
          <img
            className="h-5"
            src="/assets/images/logo_naver.svg"
            alt="네이버 로고"
          />
          <span>네이버 로그인</span>
        </Button>
      </>
    ) : (
      <>
        <Button
          type="button"
          className="h-14 w-14 rounded-full border border-gray-light-medium bg-white text-black"
          title="Google 계정으로 로그인"
        >
          <img
            className="h-8"
            src="/assets/images/logo_google.svg"
            alt="구글 로고"
          />
        </Button>
        <Button
          type="button"
          className="h-14 w-14 rounded-full bg-kakao text-black"
          title="카카오 로그인"
        >
          <img
            className="h-8"
            src="/assets/images/logo_kakao.svg"
            alt="카카오 로고"
          />
        </Button>
        <Button
          type="button"
          className="h-14 w-14 rounded-full bg-naver text-black"
          title="네이버 로그인"
        >
          <img
            className="h-full"
            src="/assets/images/logo_naver.svg"
            alt="네이버 로고"
          />
        </Button>
      </>
    );

  return <div className={buttonWrapperClassName}>{buttonContents}</div>;
}

export default memo(SocialLoginButtonSet);
