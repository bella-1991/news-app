const normaliseNYTData = (data) => {
  return data.map(article => {
    const { _id, abstract, pub_date, web_url, section_name, byline, source, multimedia, lead_paragraph, ...rest } = article || null;
    const imageUrl = (multimedia && multimedia.find(media => media.subtype === 'superJumbo').url) || null

    return {
      id: _id,
      title: abstract,
      url: web_url,
      category: section_name,
      publishedAt: pub_date,
      author: byline.original.replace('By ',''),
      description: lead_paragraph,
      image: imageUrl ? `https://www.nytimes.com/${imageUrl}` : null,
      source: {
        name: source,
      },
      ...rest,
    }
  });
}

const normaliseGuardianData = (data) => {
  return data.map(article => {
    const { id, webTitle, webPublicationDate, webUrl, sectionName, ...rest } = article || null;

    return {
      id: id,
      title: webTitle,
      url: webUrl,
      category: sectionName,
      publishedAt: webPublicationDate,
      image: (article.elements && article.elements.find(element => element.relation === 'thumbnail')?.assets[0]?.file) || null,
      source: {
        name: 'Guardian',
      },
      ...rest,
    }
  });
}

const normaliseNEWSAPIData = (data) => {
  return data.map(article => {
    const { urlToImage, ...rest } = article;

    return {
      image: urlToImage,
      ...rest,
    }
  });
}

const normaliseGNEWSData = (data) => {
  return data.map(article => {
    const { webPublicationDate, webUrl, ...rest } = article;

    return {
      url: webUrl,
      publishedAt: webPublicationDate,
      ...rest,
    }
  });
}

export const normalizeData = (data, apiIndex) => {
    switch (apiIndex) {
      case 'GUARDIAN': // GUARDIAN API
        return normaliseGuardianData(data?.response?.results);
      case 'GNEWS': // GNEWS API
        return normaliseGNEWSData(data?.articles);
      case 'NEWSAPI': // NEWSAPI API
        return normaliseNEWSAPIData(data?.articles);
      case 'NYT': // NEWSAPI API
        return normaliseNYTData(data?.response?.docs);
      default:
        return data.articles;
    }
};

export const filterByResultPerPage = (results, currentPage, rpp) => {  
  const indexOfLast = currentPage * rpp;
  const indexOfFirst = indexOfLast - rpp;
  const currentList = results.slice(indexOfFirst, indexOfLast);

  return currentList
}

export const getSortedNews = (normalizedResponses, rpp, page) => {
  const pages = (((normalizedResponses.length - 3) + rpp - page) / rpp);
  const allNews = normalizedResponses.slice(3);
  const featuredNews = normalizedResponses.slice(0,3);
  const filteredNews = filterByResultPerPage(allNews, page, rpp);

  return { 
    allNews: allNews, 
    featuredNews: featuredNews,
    filteredNews: filteredNews,
    numberOfResults: allNews.length,
    pages: Math.floor(pages), 
    page: page,
  };
}