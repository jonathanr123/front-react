import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
      typeof window === 'object' &&
      typeof window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
          window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f
  )
);

export default store;