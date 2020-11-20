import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer as singleReducer } from '../pages/MovieList/redux/reducer';
import { reducer as movieReducer } from '../pages/SearchMovie/redux/store/reducer';

const rootReducer = combineReducers({
  movieReducer,
  singleReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
