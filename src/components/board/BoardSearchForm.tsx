import { memo, useCallback, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useModal } from '@/hooks/useModal';

interface BoardSearchFormProps {
  categoryList: string[];
}

function BoardSearchForm({ categoryList }: BoardSearchFormProps) {
  const { alert } = useModal();
  const [searchFormData, setSearchFormData] = useState({
    category: categoryList[0],
    keyword: '',
  });

  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setSearchFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
  const handleClickCategory = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const { innerText } = e.currentTarget;
      setSearchFormData((prev) => {
        if (prev.category === innerText) return prev;
        return { ...prev, category: innerText };
      });
    },
    []
  );
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      const { category, keyword } = searchFormData;
      e.preventDefault();
      // 카테고리 HTML 변조 validation
      if (!categoryList.includes(category))
        return await alert('warning', '잘못된 요청입니다.');
      // 키워드 값 validation
      if (keyword.replace(/\s/g, '').length === 0)
        return await alert('warning', '검색어를 입력해주세요.');
      return await alert('warning', '현재 준비중인 기능입니다.');
    },
    [searchFormData]
  );

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <Dropdown
        list={categoryList}
        currentCategory={searchFormData.category}
        onClick={handleClickCategory}
      />
      <label className="sr-only" htmlFor="keyword">
        검색어
      </label>
      <Input
        id="keyword"
        name="keyword"
        placeholder="검색어 입력"
        value={searchFormData.keyword}
        onChange={handleChangeKeyword}
      />
      <Button className="px-4 py-1" type="submit">
        검색
      </Button>
    </form>
  );
}

export default memo(BoardSearchForm);
