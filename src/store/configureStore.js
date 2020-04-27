import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import Reducer from '../reducers';
import Epic from '../epics';

export default function configureStore() {
    // createEpicMiddlewarec會將epic函數轉為redux中間件
    const epicMiddleware = createEpicMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // https://github.com/zalmoxisus/redux-devtools-extension
    // 將reducer傳入以創建一個store
    const store = createStore(
        Reducer,
        composeEnhancers((applyMiddleware(epicMiddleware))),
      );
    console.log(composeEnhancers);
    epicMiddleware.run(Epic);

    return store;
}