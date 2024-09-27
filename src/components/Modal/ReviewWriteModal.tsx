import { Fragment, useState } from 'react';
import Button from '../common/Button';
import { FormAlertErrorBox } from '../Form';

type InitialState = {
  star: number;
  content: string;
};

const initialState: InitialState = {
  star: 0,
  content: '',
};

export default function ReviewWriteModal() {
  const [formData, setFormData] = useState<InitialState>(initialState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    const newValue = name === 'star' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };
  const MAX_STAR_COUNT = 5;
  const starArray = new Array(MAX_STAR_COUNT)
    .fill(1)
    .map((value, index) => value + index);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    if (formData.star < 1 || formData.star > 5)
      return setErrorMessage('평점은 1점부터 5점까지 가능합니다.');
    if (formData.content.trim().length === 0)
      return setErrorMessage('후기 내용을 입력해주세요.');
    // 리뷰 생성 API 호출
  };
  return (
    <form
      className="flex w-[500px] flex-col justify-between gap-5 px-6 py-5"
      onSubmit={handleSubmit}
    >
      <p className="mb-2 inline-block text-text-large font-semibold">
        후기 작성
      </p>
      <div className="flex flex-col items-center gap-3">
        {errorMessage && <FormAlertErrorBox>{errorMessage}</FormAlertErrorBox>}
        <p className="text-center text-text-large font-semibold">
          OOO 간병인님의 간병 서비스를 평가해주세요.
        </p>
        <div className="flex w-full justify-center">
          {starArray.map((value) => {
            const starImage =
              value > formData.star
                ? "bg-[url('/assets/images/review_star_empty.png')]"
                : "bg-[url('/assets/images/review_star_full.png')]";
            return (
              <Fragment key={value}>
                <label
                  className={`${starImage} cursor-pointer rounded-full bg-[length:45px_45px] bg-center bg-no-repeat p-7 transition-all duration-[50ms] hover:scale-105 hover:bg-gray-light`}
                  htmlFor={value}
                >
                  <span className="sr-only">평점</span>
                </label>
                <input
                  className="sr-only"
                  type="radio"
                  name="star"
                  id={value}
                  value={value}
                  onChange={handleChange}
                />
              </Fragment>
            );
          })}
        </div>
        <p className="mb-3 text-center font-semibold">
          평점 : {formData.star}점
        </p>
        <p className="text-center text-text-large font-semibold">
          간병 서비스 후기를 남겨주세요.
        </p>
        <p className="text-center text-text-small">
          간병인의 서비스 품질향상에 큰 도움이 됩니다.
        </p>

        <label className="sr-only" htmlFor="content">
          후기 내용
        </label>
        <textarea
          className="h-24 w-full resize-none rounded-md border-2 border-gray-medium p-3 focus:outline-none focus-visible:border-secondary"
          name="content"
          id="content"
          placeholder="후기 내용을 입력해주세요."
          onChange={handleChange}
          value={formData.content}
        ></textarea>
      </div>
      <Button type="submit">제출</Button>
    </form>
  );
}
