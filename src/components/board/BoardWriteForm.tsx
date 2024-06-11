import { memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { BoardFormData } from '@/types/formData.interface';

import Input from '../common/Input';
import Dropdown from '../Dropdown';
import Button from '../common/Button';
import CustomReactQuill from '../Editor/CustomReactQuill';

interface BoardWriteFormProps {
  title: string;
}
const boardCategoryListArray = ['자유게시판'];

function BoardWriteForm({ title }: BoardWriteFormProps) {
  const [writeFormData, setWriteFormData] = useState<BoardFormData>({
    category: boardCategoryListArray[0],
    title: '',
    content: '',
    password: '',
  });

  const handleChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      return setWriteFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
  const handleClickCategory = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const { innerText } = e.currentTarget;
      return setWriteFormData((prev) => {
        if (prev.category === innerText) return prev;
        return { ...prev, category: innerText };
      });
    },
    []
  );
  const handleChangeQuill = useCallback((value: string) => {
    return setWriteFormData((prev) => ({ ...prev, content: value }));
  }, []);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { category, title, password, content } = writeFormData;
      if (title.replace(/\s/g, '').length === 0)
        return alert('제목을 입력해주세요.');
      if (content.replace(/\s/g, '').length === 0)
        return alert('내용을 입력해주세요.');
      alert(`category: ${category}
    title: ${title}
    password: ${password}
    content: ${content}`);
    },
    [writeFormData]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-title-small">{title}</h3>
      </div>

      <div className="mt-3 flex w-full flex-col overflow-hidden rounded-md border border-gray-medium bg-white">
        <div className="border-b border-gray-medium bg-gray-light px-5 py-3">
          <div className="flex items-center gap-3">
            <Dropdown
              className="h-9 border-gray-medium-dark"
              currentCategory={writeFormData.category}
              onClick={handleClickCategory}
              list={boardCategoryListArray}
            />
            <div className="flex-1">
              <Input
                type="text"
                className="h-9 w-full border-gray-medium-dark"
                label="제목"
                name="title"
                placeholder="제목을 입력하세요."
                isHideLabel={true}
                onChange={handleChangeText}
              />
            </div>
            <Input
              type="password"
              className="h-9 w-[140px] border-gray-medium-dark"
              label="비밀번호"
              name="password"
              placeholder="비밀번호"
              isHideLabel={true}
              onChange={handleChangeText}
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
          <CustomReactQuill onChange={handleChangeQuill} />
        </div>
      </div>

      <div className="mt-3 text-right">
        <Link
          to={'..'}
          className="mr-2 inline-block h-8 rounded-md bg-gray-medium px-4 py-1 align-top text-text-medium text-white transition-all hover:brightness-[0.95] active:brightness-[1.05]"
        >
          취소
        </Link>
        <Button type="submit" className="h-8 px-4 py-1">
          글쓰기
        </Button>
      </div>
    </form>
  );
}

export default memo(BoardWriteForm);
