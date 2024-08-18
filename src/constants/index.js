
/*
 * URLs
 */

export const API = {
    NEWSAPI: {
        url: 'https://newsapi.org/v2/everything?q=',
        key: '2facf914e85d4da89ecb3d5421a23dcb',
        keyText: 'apiKey',
        additionalParams: '&sortBy=relevance&pageSize=10'
    },
    GUARDIAN: {
        url: 'https://content.guardianapis.com/search?&q=',
        key: '4044657d-d5ea-417a-a986-5aaa6683bf2b',
        keyText: 'api-key',
        additionalParams: '&order-by=relevance&show-elements=image&show-references=author&show-fields=headline,body&max=10',
    },
    // GNEWS: {
    //     url: 'https://gnews.io/api/v4/search?q=',
    //     key: 'c22fca74d690930d1b566fd0e6f3869e',
    //     keyText: 'apikey',
    //     additionalParams: '&sortby=relevance'
    // },
}

/*
 * Nav
 */
export const Navigation = [{
    text: 'World',
    label: 'world'
},{
    text: 'Business',
    label: 'business'
},{
    text: 'Politics',
    label: 'politics'
},{
    text: 'U.S.A',
    label: 'usa'
},{
    text: 'Europe',
    label: 'europe'
},{
    text: 'Technology',
    label: 'technology'
},{
    text: 'Health',
    label: 'health'
},{
    text: 'Lifestyle',
    label: 'lifestyle'
},{
    text: 'Science',
    label: 'science'
},{
    text: 'Sports',
    label: 'sports'
},{
    text: 'Opinion',
    label: 'opinion'
},{
    text: 'Cooking',
    label: 'cooking'
},{
    text: 'Weather',
    label: 'weather'
}]

