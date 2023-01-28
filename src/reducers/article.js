import { SET_ARTICLES, SET_LOADING_STATUS } from "../actions/actiontype";

const initialState = {
  articles: [],
  loading: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    default:
      return state;
  }
};

export default articleReducer;
