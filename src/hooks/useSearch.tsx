import { fetchSearchResult } from '@/api/search.api';
import { SearchResult } from '@/types/searchResult.model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useSearch = () => {
  const location = useLocation();
  const [result, setResult] = useState<SearchResult[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    fetchSearchResult({
      sort: params.get('sort'),
    });
  }, [location.search]);

  return result;
};
