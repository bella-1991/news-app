
/*
 * URLs
 */

export const API = {
    NYT: {
        search: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=',
        key: 'ztQ3TmVIXM3E83zfL1r9gGPyocdPDmc8',
        keyText: 'api-key',
        sort: 'relevance',
        sortText: 'sort',
        langText: 'lang',
        additionalPrarams: null
    },
    // NEWSAPI: {
    //     search: 'https://newsapi.org/v2/everything?q=',
    //     category: 'https://newsapi.org/v2/top-headlines/',
    //     key: '2facf914e85d4da89ecb3d5421a23dcb',
    //     keyText: 'apiKey',
    //     sort: 'relevance',
    //     sortText: 'sortBy',
    //     sourcesText: 'sources',
    //     langText: 'language',
    //     additionalParams: '&pageSize=10'
    // },
    GUARDIAN: {
        search: 'https://content.guardianapis.com/search?&q=',
        key: '4044657d-d5ea-417a-a986-5aaa6683bf2b',
        keyText: 'api-key',
        sort: 'relevance',
        sortText: 'order-by',
        langText: 'lang',
        additionalParams: '&show-elements=image&show-references=author&show-fields=headline,body',
    },
    // GNEWS: {
    //     search: 'https://gnews.io/api/v4/search?q=',
    //     category: 'https://gnews.io/api/v4/top-headlines?category=',
    //     key: 'c22fca74d690930d1b566fd0e6f3869e',
    //     keyText: 'apikey',
    //     sort: 'relevance',
    //     sortText: 'sortby',
    //     langText: 'lang',
    //     additionalParams: null
    // },
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
    AUTHOR: '',
    CATEGORY: '',
    ERROR: '',
    FEATURED_NEWS: [],
    FILTERS_OPEN: false,
    FILTER_OPTIONS: {
        sources: {
            id: 'source',
            type: 'select',
            label: 'Source:',
            showDefault: true,
            options: [],
        },
        categories: {
            id: 'category',
            type: 'select',
            label: 'Category:',
            showDefault: true,
            options: []
        },
        authors: {
            id: 'author',
            type: 'select',
            label: 'Author:',
            showDefault: true,
            options: []
        },
        lang: {
            id: 'lang',
            type: 'select',
            label: 'Language:',
            showDefault: false,
            options: [{
                code: 'ar',
                value: 'Arabic'
            },{
                code: 'de',
                value: 'German'
            },{
                code: 'en',
                value: 'English'
            },{
                code: 'es',
                value: 'Spanish'
            },{
                code: 'fr',
                value: 'French'
            },{
                code: 'he',
                value: 'Hebrew'
            },{
                code: 'it',
                value: 'Italian'
            },{
                code: 'nl',
                value: 'Dutch'
            },{
                code: 'no',
                value: 'Norwegian'
            },{
                code: 'pt',
                value: 'Portuguese'
            },{
                code: 'ru',
                value: 'Russian'
            },{
                code: 'sv',
                value: 'Swedish'
            },{
                code: 'zh',
                value: 'Chinese'
            },]
        },
        orderBy: {
            id: 'orderBy',
            type: 'select',
            label: 'Order by:',
            showDefault: false,
            options: [{
                code: 'relevance',
                value: 'Relevance'
            },{
                code: 'oldest',
                value: 'Oldest'
            },{
                code: 'newest',
                value: 'Newest'
            },]
        },
        sort: {
          id: 'sort',
          type: 'select',
          label: 'Sort by:',
          showDefault: false,
          options: [{
                code: 'REL',
                value: 'Most Relevant'
            },{
                code: 'ASCE',
                value: 'News Ascending'
            },{
                code: 'DESC',
                value: 'News Descending'
            }],
        },
        rpp: {
          id: 'rpp',
          type: 'select',
          label: 'Results per page:',
          options: [{
                code: 3,
                value: 3
            },{
                code: 10,
                value: 10
            },{
                code: 20,
                value: 20
            },{ 
                code: 50,
                value: 50
            }, {
                code: 100,
                value: 100
            }]
        },
    },
    LANG: 'en',
    LOADING: true,
    NEWS: [],
    ORDER: 'relevance',
    PAGE: 1,
    PAGES: null,
    RPP: 3,
    SEARCH_OPEN: false,
    SEARCH_TERM: Navigation[0].label,
    SORT: 'REL',
    SOURCE: ''
}