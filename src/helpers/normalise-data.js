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

// const normaliseGNEWSData = (data) => {
//   console.log(data);
//   return data.map(article => {
//     const { webPublicationDate, webUrl, ...rest } = article;

//     return {
//       url: webUrl,
//       publishedAt: webPublicationDate,
//       ...rest,
//     }
//   });
// }

export const normalizeData = (data, apiIndex) => {
    switch (apiIndex) {
      case 'GUARDIAN': // GUARDIAN API
        return normaliseGuardianData(data?.response?.results);
      // case 'GNEWS': // GNEWS API
      //   return normaliseGNEWSData(data?.articles);
    case 'NEWSAPI': // NEWSAPI API
        return normaliseNEWSAPIData(data?.articles);
      default:
        return data.articles;
    }
};