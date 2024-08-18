import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainPost from '../../components/main-post';
import { API as api } from '../../constants';
import { normalizeData } from '../../helpers/normalise-data';
import NewsList from '../../components/news-list';
import Pagination from '../../components/pagination';

function Home() {
    const [searchTerm, setSearchTerm] = useState('world');
    const [newsData, setNewsData] = useState([]);
    const [featuredNews, setFeaturedNews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make API calls simultaneously using axios and Promise.all
          const responses = await Promise.all(Object.values(api).map((item) => axios.get(`${item.url}${searchTerm}&${item.keyText}=${item.key}${item.additionalParams ? item.additionalParams : ''}`)));
  
          // Normalize each response based on the API index
          const normalizedResponses = responses.map((response, index) => {
            // console.log(response);
            return normalizeData(response.data, Object.keys(api)[index])
          });
  
          // console.log(normalizedResponses)
  
          // Set the normalized data in state
          setFeaturedNews(normalizedResponses.flat().slice(0,3))
          setNewsData(normalizedResponses.flat().slice(3));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [searchTerm]);

    return ( 
        <div>
          <MainPost article={featuredNews[0]} />
          <NewsList 
            articles={featuredNews.slice(1,3)} 
            searchTerm={`Featured`} 
            direction='left'
            featured />
          <NewsList 
            articles={newsData} 
            searchTerm={searchTerm} />
          <Pagination currentPage={1} pagePath="example" totalPages={60} />
        </div>
     );
}

export default Home;