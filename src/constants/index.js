
/*
 * URLs
 */

export const API = {
    NYT: {
        search: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=',
        key: 'ztQ3TmVIXM3E83zfL1r9gGPyocdPDmc8',
        keyText: 'api-key',
        sort: 'relevance',
        sortText: 'sort=',
        additionalPrarams: null
    },
    // NEWSAPI: {
    //     search: 'https://newsapi.org/v2/everything?q=',
    //     key: '2facf914e85d4da89ecb3d5421a23dcb',
    //     keyText: 'apiKey',
        // sort: 'relevance',
        // sortText: 'sortBy=',
    //     additionalParams: '&pageSize=10'
    // },
    GUARDIAN: {
        search: 'https://content.guardianapis.com/search?&q=',
        key: '4044657d-d5ea-417a-a986-5aaa6683bf2b',
        keyText: 'api-key',
        sort: 'relevance',
        sortText: 'order-by=',
        additionalParams: '&show-elements=image&show-references=author&show-fields=headline,body',
    },
    GNEWS: {
        search: 'https://gnews.io/api/v4/search?q=',
        category: 'https://gnews.io/api/v4/top-headlines?category=',
        key: 'c22fca74d690930d1b566fd0e6f3869e',
        keyText: 'apikey',
        sort: 'relevance',
        sortText: 'sortby=',
        additionalParams: null
    },
}

/*
 * Nav
 */
export const Navigation = [{
    text: 'World',
    label: 'world'
},{
    text: 'General',
    label: 'general'
},{
    text: 'Nation',
    label: 'nation'
},{
    text: 'Entertainment',
    label: 'entertainment'
},{
    text: 'Business',
    label: 'business'
},{
    text: 'Technology',
    label: 'technology'
},{
    text: 'Health',
    label: 'health'
},{
    text: 'Science',
    label: 'science'
},{
    text: 'Sports',
    label: 'sports'
},]


/*
 * Defaults
 */
export const Defaults = {
    AVAILABLE_LANG: ['en', 'sv'],
    CATEGORY: '',
    ERROR: '',
    FEATURED_NEWS: [],
    FILTERS: [],
    FILTERS_OPEN: false,
    LANG: 'en',
    LOADING: true,
    NEWS: [],
    PAGE: 1,
    PAGES: null,
    RPP: 3,
    SEARCH_OPEN: false,
    SEARCH_TERM: Navigation[0].label,
    SORT: 'relevance',
}