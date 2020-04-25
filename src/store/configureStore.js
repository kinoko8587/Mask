// import負責創建store的函式createStore
import { createStore, applyMiddleware } from 'redux';
// 引入createEpicMiddleware
import { createEpicMiddleware } from 'redux-observable';

import Reducer from './reducers';
import Epic from './epics';

export default function configureStore() {
    // createEpicMiddlewarec會將epic函數轉為redux中間件
    const epicMiddleware = createEpicMiddleware();

    // https://github.com/zalmoxisus/redux-devtools-extension
    // 將reducer傳入以創建一個store
    const store = createStore(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(epicMiddleware)),
      );

    epicMiddleware.run(Epic);

    return store;
}