import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Defaults as defaultValues } from '../../constants';

const initialState = {
    availableLang: defaultValues.AVAILABLE_LANG,
    category: defaultValues.CATEGORY,
    error: defaultValues.ERROR,
    featuredNews: defaultValues.FEATURED_NEWS,
    filters: defaultValues.FILTERS,
    filtersOpen: defaultValues.FILTERS_OPEN,
    lang: defaultValues.LANG,
    loading: defaultValues.LOADING,
    news: defaultValues.NEWS,
    searchOpen: defaultValues.SEARCH_OPEN,
    searchTerm: defaultValues.SEARCH_TERM,
}

export const fetchNewsData = createAsyncThunk('news/fetchNews', () => {
    return axios
        .get(`https://newsapi.org/v2/everything?q=world&apiKey=2facf914e85d4da89ecb3d5421a23dcb&sortBy=relevance&pageSize=10`)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        })
});

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        changeSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        toggleSearch: (state, action) => {
            state.searchOpen = action.payload
        },
        toggleFilters: (state, action) => {
            state.filtersOpen = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchNewsData.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchNewsData.fulfilled, (state, action) => {
            state.loading = false
            state.news = action.payload
            state.error = ''
        })
        builder.addCase(fetchNewsData.rejected, (state, action) => {
            state.loading = false
            state.news = []
            state.error = action.error.message
        })
    }
});

export default newsSlice.reducer;
export const { changeSearchTerm, toggleFilters, toggleSearch } = newsSlice.actions;