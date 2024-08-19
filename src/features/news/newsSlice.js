import axios from 'axios';
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { normalizeData, filterByResultPerPage, getSortedNews } from '../../helpers';
import { Defaults as defaultValues } from '../../constants';

const initialState = {
    allNews: defaultValues.NEWS,
    availableLang: defaultValues.AVAILABLE_LANG,
    category: defaultValues.CATEGORY,
    error: defaultValues.ERROR,
    featuredNews: defaultValues.FEATURED_NEWS,
    filters: defaultValues.FILTERS,
    filtersOpen: defaultValues.FILTERS_OPEN,
    lang: defaultValues.LANG,
    loading: defaultValues.LOADING,
    numberOfResults: null,
    page: defaultValues.PAGE,
    pages: defaultValues.PAGES,
    rpp: defaultValues.RPP,
    searchOpen: defaultValues.SEARCH_OPEN,
    searchTerm: defaultValues.SEARCH_TERM,
    sort: defaultValues.SORT,
}

export const fetchCategoryNews = createAsyncThunk(
    'news/fetchCategoryNews', 
    (api, { getState }) => {
        const state = getState().news;
        const { category, lang, rpp } = state;
        return axios
            .get(`${api.category}${category}&${api.keyText}=${api.key}${api.additionalParams ? api.additionalParams : ''}&lang=${lang}`)
            .then(response => {
                const normalizedResponses = normalizeData(response.data, 'GNEWS');

                return getSortedNews(normalizedResponses, rpp, 1);
            })
            .catch(error => {
                console.log(error)
            })
    }
);

export const fetchNewsData = createAsyncThunk(
    'news/fetchNews',
    async (data, { getState }) => {
        const state = getState().news;
        const { searchTerm, rpp } = state;

        const responses = await Promise.all(
            Object.values(data).slice(0,2).map((item) => 
            axios
                .get(`${item.search}${searchTerm}&${item.keyText}=${item.key}${item.additionalParams ? item.additionalParams : ''}`)
                .then(response => response.data)
                .catch(error => {
                console.log(error)
                })
        ));

        // Normalize each response based on the API index
        const normalizedResponses = responses.map((response, index) => {
            return normalizeData(response, Object.keys(data).slice(0,2)[index])
        }).flat();

        return getSortedNews(normalizedResponses, rpp, 1);
    },
)

export const handlePhangePage = (page) => (dispatch, getState) => {
    const state = getState().news;
    const filteredNews = filterByResultPerPage(state.allNews, page, state.rpp)
    
    dispatch(changePage({ page, filteredNews }));
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
        },
        toggleSearch: (state, action) => {
            state.searchOpen = action.payload;
        },
        toggleFilters: (state, action) => {
            state.filtersOpen = action.payload;
        },
        changePage: (state, action) => {
            state.page = action.payload.page;
            state.filteredNews = action.payload.filteredNews;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchNewsData.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {  
            const { allNews, featuredNews, pages, page, filteredNews, numberOfResults } = action?.payload || {}
            state.loading = false;
            state.allNews = allNews;
            state.featuredNews = featuredNews;
            state.filteredNews = filteredNews;
            state.category = '';
            state.error = '';
            state.pages = pages;
            state.page = page;
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
            const { allNews, featuredNews, pages, page, filteredNews, numberOfResults } = action?.payload || {}
            
            state.loading = false;
            state.allNews = allNews;
            state.featuredNews = featuredNews;
            state.filteredNews = filteredNews;
            state.error = '';
            state.pages = pages;
            state.page = page;
            state.numberOfResults = numberOfResults;
        })
        builder.addCase(fetchCategoryNews.rejected, (state, action) => {
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
    changePage 
} = newsSlice.actions;