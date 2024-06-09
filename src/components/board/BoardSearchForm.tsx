import { memo, useCallback, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface BoardSearchFormProps {
  categoryList: string[];
}

function BoardSearchForm({ categoryList }: BoardSearchFormProps) {
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
  const handleClickSetCategory = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const { innerText } = e.currentTarget;
      if (searchFormData.category === innerText) return;
      setSearchFormData((prev) => ({ ...prev, category: innerText }));
    },
    []
  );
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const { category, keyword } = searchFormData;
      e.preventDefault();
      alert(category + ' ' + keyword);
    },
    [searchFormData]
  );

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <Dropdown
        list={categoryList}
        currentCategory={searchFormData.category}
        onClick={handleClickSetCategory}
      />
      <Input
        label="검색어"
        name="keyword"
        placeholder="검색어 입력"
        value={searchFormData.keyword}
        isHideLabel={true}
        onChange={handleChangeKeyword}
      />
      <Button className="px-4 py-1" type="submit">
        검색
      </Button>
    </form>
  );
}

export default memo(BoardSearchForm);
