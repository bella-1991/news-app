import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../../features/news/newsSlice';
import MainPost from '../../components/main-post';
import { API as api, Navigation as nav } from '../../constants';
import { normalizeData } from '../../helpers/normalise-data';
import NewsList from '../../components/news-list';
import Pagination from '../../components/pagination';

function Home() {
    const state = useSelector((state) => state.news);
    const { searchTerm, loading, error, newsData, featuredNews } = state || {};
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchNewsData());
      // const fetchData = async () => {
      //   try {
      //     // Make API calls simultaneously using axios and Promise.all
      //     const responses = await Promise.all(
      //       Object.values(api).map((item) => 
      //         axios
      //           .get(`${item.url}${searchTerm}&${item.keyText}=${item.key}${item.additionalParams ? item.additionalParams : ''}`)
      //           .then(response => response.data)
      //           .catch(error => {
      //             console.log(error)
      //           })
      //     ));
  
      //     // Normalize each response based on the API index
      //     const normalizedResponses = responses.map((response, index) => {
      //       return normalizeData(response, Object.keys(api)[index])
      //     });
  
      //     // console.log(normalizedResponses)
  
      //     // Set the normalized data in state
      //     setFeaturedNews(normalizedResponses.flat().slice(0,3))
      //     setNewsData(normalizedResponses.flat().slice(3));
      //   } catch (error) {
      //     console.error("Error fetching data:", error);
      //   }
      // };
  
      // fetchData();
    }, [searchTerm]);

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
            featured />
          <NewsList 
            loading={loading}
            length={3}
            articles={newsData} 
            searchTerm={searchTerm} />
          <Pagination currentPage={1} pagePath="example" totalPages={loading ? 1 : 60} />
        </div>
     );
}

export default Home;