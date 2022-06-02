import { createStore, applyMiddleware,compose } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
      typeof window === 'object' &&
      typeof window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
          window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f
  )
);

export default store;