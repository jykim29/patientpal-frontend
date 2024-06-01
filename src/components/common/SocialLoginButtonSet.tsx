import Button from './Button';

export default function SocialLoginButtonSet({
  type,
}: {
  type: 'horizontal' | 'vertical';
}) {
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
          icon={{
            url: '/assets/logo_google.svg',
            alt: '구글 로고',
            className: 'h-5',
          }}
        >
          Google 계정으로 로그인
        </Button>
        <Button
          type="button"
          className="w-full bg-kakao text-black"
          icon={{
            url: '/assets/logo_kakao.svg',
            alt: '카카오 로고',
            className: 'h-5',
          }}
        >
          카카오 로그인
        </Button>
        <Button
          type="button"
          className="w-full bg-naver text-white"
          icon={{
            url: '/assets/logo_naver.svg',
            alt: '카카오 로고',
            className: 'h-full',
          }}
        >
          네이버 로그인
        </Button>{' '}
      </>
    ) : (
      <>
        {' '}
        <Button
          type="button"
          className="h-14 w-14 rounded-full border border-gray-light-medium bg-white text-black"
          icon={{
            url: '/assets/logo_google.svg',
            alt: '구글 로고',
            className: 'h-8',
          }}
          title="Google 계정으로 로그인"
        />
        <Button
          type="button"
          className="h-14 w-14 rounded-full bg-kakao text-black"
          icon={{
            url: '/assets/logo_kakao.svg',
            alt: '카카오 로고',
            className: 'h-8',
          }}
          title="카카오 로그인"
        />
        <Button
          type="button"
          className="h-14 w-14 rounded-full bg-naver text-black"
          icon={{
            url: '/assets/logo_naver.svg',
            alt: '네이버 로고',
            className: 'h-full',
          }}
          title="네이버 로그인"
        />
      </>
    );

  return <div className={buttonWrapperClassName}>{buttonContents}</div>;
}
