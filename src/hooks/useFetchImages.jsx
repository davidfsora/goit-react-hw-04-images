import axios from 'axios';
import { useState } from 'react';

export default function useFetchImages() {
  const PIXABAY_KEY = '38599637-94ee16ac1abf8bf26f0455f90';
  const per_page = 12;
  const [pics, setPics] = useState({
		data: [],
    err: null,
    totalHits: 0,
  });
	
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPic, setCurrentPic] = useState({});
  const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	
  const handleInput = evt => setSearchQuery(evt.target.value);
	
  const handleSearch = evt => {
		evt.preventDefault();
		setPage(1);
		setPage(page+1);
    setPics(prev => ({ ...prev, data: [] }));
    handleFetchImages();
  };
	
		function handleFetchImages() {
		setLoading(true);
    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`;
    axios
      .get(URL)
      .then(response => {
        setPics(prev => ({
          ...prev,
          data: [...prev.data, ...response.data.hits],
          totalHits: response.data.totalHits,
        }));
				setLoading(false);
      })
      .catch(err => {
        alert(err);
      });
  }

  const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
    handleFetchImages();
  };

  return {
    pics,
    currentPic,
    setCurrentPic,
    loading,
    handleInput,
    searchQuery,
    handleSearch,
    handleLoadMore,
    page,
    per_page,
  };
}
