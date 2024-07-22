import { useCallback, useEffect } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { ReactQuillProps } from 'react-quill';
import { useForm } from 'react-hook-form';

import { boardService } from '@/services/BoardService';
import { useAuthStore } from '@/store/useAuthStore';
import { API_FAILED } from '@/constants/api';
import { PostResponse } from '@/types/api/board';
import Input from '../common/Input';
import Button from '../common/Button';
import CustomReactQuill from '../Editor/CustomReactQuill';

export default function BoardWriteForm({
  title,
  type,
}: {
  title: string;
  type: 'write' | 'modify';
}) {
  const loaderData = useLoaderData() as PostResponse;
  const { setValue, register, handleSubmit } = useForm({
    defaultValues: {
      title: loaderData?.title || '',
      content: loaderData?.content || '',
    },
    reValidateMode: 'onSubmit',
  });
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    register('content', {
      validate: {
        required: (value) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(value, 'text/html');
          if (doc && doc.body.textContent?.trim().length === 0)
            return '내용을 입력해주세요.';
          return true;
        },
      },
    });
  }, []);
  const handleChangeQuill = useCallback<Required<ReactQuillProps>['onChange']>(
    (value) => {
      return setValue('content', value);
    },
    []
  );

  const submitCallback = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    let response = null;
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    if (type === 'write')
      response = await boardService.writePost(
        'FREE',
        { title, content },
        axiosConfig
      );
    if (type === 'modify' && postId)
      response = await boardService.updatePost(
        'FREE',
        postId,
        { title, content },
        axiosConfig
      );
    if (response?.status === API_FAILED)
      return alert('통신 중 오류가 발생하였습니다. 잠시후 다시 시도해주세요.');
    return navigate('..', { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit(submitCallback, (errors) => {
        if (errors.title) return alert(errors.title.message);
        if (errors.content) return alert(errors.content.message);
      })}
    >
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
      </div>

      <div className="mt-3 flex w-full flex-col overflow-hidden rounded-md border border-gray-medium bg-white">
        <div className="border-b border-gray-medium bg-gray-light px-5 py-3">
          <div className="w-full">
            <label className="sr-only" htmlFor="title">
              제목
            </label>
            <Input
              type="text"
              id="title"
              className="h-9 w-full"
              placeholder="제목을 입력하세요."
              {...register('title', {
                required: '제목을 입력해주세요.',
              })}
            />
          </div>
          <p className="mt-2 text-text-small text-gray-medium-dark">
            ※ 쉬운 비밀번호를 입력하면 타인의 수정, 삭제가 쉽습니다.
          </p>
          <p className="mt-1 text-text-small text-gray-medium-dark">
            ※ 음란물, 차별, 비하, 혐오 및 초상권, 저작권 침해 게시물은 민,
            형사상의 책임을 질 수 있습니다.
          </p>
        </div>

        <div>
          <CustomReactQuill
            onChange={handleChangeQuill}
            defaultValue={loaderData?.content}
          />
        </div>
      </div>

      <div className="mt-3 text-right">
        <Link
          to={'..'}
          className="mr-2 inline-block h-8 rounded-md bg-negative px-4 py-1 align-top text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          취소
        </Link>
        <Button type="submit" className="h-8 px-4 py-1">
          {type === 'write' ? '완료' : '수정'}
        </Button>
      </div>
    </form>
  );
}
