import { ADD_ARTICLE, REMOVE_ARTICLE, UPDATE_ARTICLE } from "../constants/action-types";
const initialState = {
  articles: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return { ...state, articles: [...state.articles, action.payload] };
    case REMOVE_ARTICLE:
    let articlesList = state.articles.filter(function(item) {
      return action.payload != item.id 
    })
    return { ...state, articles: articlesList}
    case UPDATE_ARTICLE:
    let allArticles = state.articles
    let objIndex = allArticles.findIndex((obj => action.payload.id == obj.id))
    allArticles[objIndex]['title'] = action.payload.title
    // let articlesList1 = state.articles.filter(function(item) {
    //  // let items = 
    //   if (action.payload.id == item.id) {
    //     item.title = action.payload.title
    //   }
    //   //return action.payload != item.id 
    // })
    return { ...state, articles: allArticles}
    default:
      return state;
  }
};
export default rootReducer;