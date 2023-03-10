import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import questionReducer from './question'
import answerReducer from './answer';
import questionLikeReducer from './questionLike'
import answerLikeReducer from './answerLike'
import userProfileReducer from './userProfile';

const rootReducer = combineReducers({
  session,
  question:questionReducer,
  answer: answerReducer,
  questionLike:questionLikeReducer,
  answerLike:answerLikeReducer,
  userProfile:userProfileReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
