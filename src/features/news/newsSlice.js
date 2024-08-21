import axios from 'axios';
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { normalizeData, getUniqueValues, getSortedNews } from '../../helpers';
import { Defaults as defaultValues, API as api } from '../../constants';

const initialState = {
    allNews: defaultValues.NEWS,
    category: defaultValues.CATEGORY,
    error: defaultValues.ERROR,
    featuredNews: defaultValues.FEATURED_NEWS,
    filters: {        
        sort: defaultValues.SORT,
        orderBy: defaultValues.ORDER,
        rpp: defaultValues.RPP,
        lang: defaultValues.LANG,
        category: defaultValues.CATEGORY,
        author: defaultValues.AUTHOR,
        source: defaultValues.SOURCE,
    },
    filtersOpen: defaultValues.FILTERS_OPEN,    
    filterOptions: defaultValues.FILTER_OPTIONS,
    loading: defaultValues.LOADING,
    numberOfResults: null,
    page: defaultValues.PAGE,
    pages: defaultValues.PAGES,
    searchOpen: defaultValues.SEARCH_OPEN,
    searchTerm: defaultValues.SEARCH_TERM,
}

export const fetchCategoryNews = createAsyncThunk(
    'news/fetchCategoryNews', 
    (api, { dispatch, getState }) => {
        const state = getState().news;
        const { category, filters } = state;
        return axios
            .get(`${api.category}${category}&${api.keyText}=${api.key}&${api.sortText}=${filters.orderBy}${api.additionalParams ? api.additionalParams : ''}&${api.langText}=${filters.lang}`)
            .then(response => {
                const normalizedResponses = normalizeData(response.data, 'GNEWS');

                const categories = getUniqueValues(normalizedResponses.slice(3), 'category');
                const authors = getUniqueValues(normalizedResponses.slice(3), 'author');

                dispatch(setCategories(categories));
                dispatch(setAuthors(authors));

                return getSortedNews(normalizedResponses, 1, filters);
            })
            .catch(error => {
                console.log(error)
            })
    }
);

export const fetchNewsData = createAsyncThunk(
    'news/fetchNews',
    async (data, { dispatch, getState }) => {
        const state = getState().news;
        const { searchTerm, filters } = state;

        const responses = await Promise.all(
            Object.values(data).map((item) => 
            axios
                .get(`${item.search}${searchTerm}&${item.keyText}=${item.key}&${item.sortText}=${filters.orderBy}&${item.langText}=${filters.lang}${item.additionalParams ? item.additionalParams : ''}`)
                .then(response => response.data)
                .catch(error => {
                    console.log(error)
                })
        ));

        // Normalize each response based on the API index
        const normalizedResponses = responses.map((response, index) => {
            return normalizeData(response, Object.keys(data)[index])
        }).flat();

        const categories = getUniqueValues(normalizedResponses.slice(3), 'category');
        const authors = getUniqueValues(normalizedResponses.slice(3), 'author');

        dispatch(setCategories(categories));
        dispatch(setAuthors(authors));

        return getSortedNews(normalizedResponses, 1, filters);
    },
)

export const fetchSourcesData = createAsyncThunk(
    'news/fetchAllSources', 
    (api, { getState }) => {
        const state = getState().news;
        const { filters } = state;
        return axios
            .get(`${api.category}${api.sourcesText}?${api.keyText}=${api.key}&language=${filters.lang}`)
            .then(response => response.data && response.data.sources && response.data.sources.map(source => ({ code: source.id, value: source.name })))
            .catch(error => {
                console.log(error)
            })
    }
);

export const fetchNewsBySource = createAsyncThunk(
    'news/fetchNewsBySource', 
    (api, { dispatch, getState }) => {
        const state = getState().news;
        const { searchTerm, filters } = state;
        
        return axios
            .get(`${api.search}${searchTerm}&${api.keyText}=${api.key}&${api.sortText}=${filters.orderBy}&${api.sourcesText}=${filters.source}${api.additionalParams ? api.additionalParams : ''}&${api.langText}=${filters.lang}`)
            .then(response => {
                const normalizedResponses = normalizeData(response.data, 'NEWSAPI');

                const categories = getUniqueValues(normalizedResponses.slice(3), 'category');
                const authors = getUniqueValues(normalizedResponses.slice(3), 'author');

                dispatch(setCategories(categories));
                dispatch(setAuthors(authors));

                return getSortedNews(normalizedResponses, 1, filters);
            })
            .catch(error => {
                console.log(error)
            })
    }
);

export const handleChangePage = (page) => (dispatch, getState) => {
    const state = getState().news;
    const data = getSortedNews([...state.featuredNews, ...state.allNews], page, state.filters);
    
    dispatch(handleChangePageDispatch(data));
};

const changeFiltersOnly = (filters, dispatch) => {
    dispatch(changeFilters({ filters, page: 1 }));
}

export const handleFiltersChange = (filters) => (dispatch, getState) => {
    const state = getState().news;

    // if (filters.source !== state.filters.source && filters.source.length) {
    //     // source change. fetch news from NewsAPI only
    //     changeFiltersOnly(filters, dispatch);
    //     // dispatch(fetchNewsBySource(api.NEWSAPI));
    //     return;
    // } else 
    if (filters.orderBy !== state.filters.orderBy) {
        // order by change. fetch news from all 
        changeFiltersOnly(filters, dispatch);
        dispatch(fetchNewsData(api))
        return;
    } else if (filters.lang !== state.filters.lang) {
        // lang change. fetch news from api's that support lang 
        changeFiltersOnly(filters, dispatch);
        dispatch(fetchNewsData({ 
            // GNEWS: api.GNEWS, 
            // NEWSAPI: api.NEWSAPI, 
            GUARDIAN: api.GUARDIAN }));
        return;
    } else {
        // interal sort
        changeFiltersOnly(filters, dispatch);
        const data = getSortedNews([...state.featuredNews, ...state.allNews], 1, filters);
        dispatch(handleFiltersChangeDispatch({ ...data, page: 1 }));

    }
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        changeCategory: (state, action) => {
            state.category = action.payload;
            state.filters.category = '';
            state.filters.author = '';
            state.filters.source = null;
        },
        toggleSearch: (state, action) => {
            state.searchOpen = action.payload;
        },
        toggleFilters: (state, action) => {
            state.filtersOpen = action.payload;
        },
        changePage: (state, action) => {
            state.page = action.payload;
        },
        changeFilters: (state, action) => {
            state.category = '';
            state.filters = action.payload.filters;
            state.filters.rpp = +action.payload.filters.rpp;
            state.filtersOpen = false;
        },
        handleChangePageDispatch: (state, action) => {
            state.filteredNews = action.payload.filteredNews;
        },
        handleFiltersChangeDispatch: (state, action) => {
            state.filteredNews = action.payload.filteredNews;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        },
        setCategories: (state, action) => {
            state.filterOptions.categories.options = action.payload;
        },
        setAuthors: (state, action) => {
            state.filterOptions.authors.options = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchNewsData.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {  
            const { allNews, featuredNews, pages, filteredNews, numberOfResults } = action?.payload || {}
            
            state.loading = false;
            state.allNews = allNews;
            state.featuredNews = featuredNews;
            state.filteredNews = filteredNews;
            state.category = '';
            state.error = '';
            state.pages = pages;
            state.page = 1;
            state.numberOfResults = numberOfResults;
        })
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = false;
            state.news = [];
            state.error = action.error.message;
            state.category = '';
        })
        builder.addCase(fetchCategoryNews.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchCategoryNews.fulfilled, (state, action) => {
            const { allNews, featuredNews, pages, filteredNews, numberOfResults } = action?.payload || {}
            
            state.loading = false;
            state.allNews = allNews;
            state.featuredNews = featuredNews;
            state.filteredNews = filteredNews;
            state.error = '';
            state.pages = pages;
            state.page = 1;
            state.numberOfResults = numberOfResults;
        })
        builder.addCase(fetchCategoryNews.rejected, (state, action) => {
            state.loading = false;
            state.news = [];
            state.error = action.error.message;
        })
        builder.addCase(fetchSourcesData.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchSourcesData.fulfilled, (state, action) => {
            state.loading = false;
            state.filterOptions.sources.options = action.payload;
        })
        builder.addCase(fetchSourcesData.rejected, (state, action) => {
            state.loading = false;
            state.news = [];
            state.error = action.error.message;
        })
        builder.addCase(fetchNewsBySource.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchNewsBySource.fulfilled, (state, action) => {
            const { allNews, featuredNews, pages, filteredNews, numberOfResults } = action?.payload || {}
            state.loading = false;
            state.allNews = allNews;
            state.featuredNews = featuredNews;
            state.filteredNews = filteredNews;
            state.numberOfResults = numberOfResults;
            state.pages = pages;
        })
        builder.addCase(fetchNewsBySource.rejected, (state, action) => {
            state.loading = false;
            state.news = [];
            state.error = action.error.message;
        })
    }
});


export default newsSlice.reducer;
export const { 
    changeSearchTerm, 
    toggleFilters, 
    toggleSearch, 
    changeCategory, 
    changePage,
    changeFilters,
    handleFiltersChangeDispatch,
    handleChangePageDispatch,
    setCategories,
    setAuthors,
    setSources
} = newsSlice.actions;