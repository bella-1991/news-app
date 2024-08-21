import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData, fetchSourcesData } from '../../features/news/newsSlice';
import MainPost from '../../components/main-post';
import { API as api } from '../../constants';
import NewsList from '../../components/news-list';
import Pagination from '../../components/pagination';

function Home() {
    const state = useSelector((state) => state.news);
    const { category, searchTerm, loading, filteredNews, featuredNews, page, pages, error } = state || {};
    const dispatch = useDispatch();

    useEffect(() => {
      setTimeout(() => {
        dispatch(fetchNewsData({ 
          NYT: api.NYT, 
          NEWSAPI: api.NEWSAPI, 
          GUARDIAN: api.GUARDIAN }));
        dispatch(fetchSourcesData(api.NEWSAPI));
      }, 2000); // NYT has a time limit
    }, [dispatch, searchTerm]);

    return ( 
        <div>
          <MainPost 
            loading={loading}
            article={featuredNews ? featuredNews[0] : null} 
            />
          <NewsList 
            loading={loading}
            length={2}
            articles={featuredNews ? featuredNews?.slice(1,3) : null} 
            searchTerm={`Featured`} 
            direction='left'
            featured
            error={error} />
          <NewsList 
            loading={loading}
            length={3}
            articles={filteredNews} 
            searchTerm={category || searchTerm}
            error={error}  />
          <Pagination currentPage={page} pagePath="example" totalPages={loading ? page : pages} />
        </div>
     );
}

export default Home;