import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { UserReducer } from "./redux/users/store/reducers";
import createSagaMiddleware from 'redux-saga'; 
import {all} from 'redux-saga/effects'
import { chatsSaga } from "./redux/chats/saga";
import { UserChatReducer } from "./redux/chats/store/reducers";
import { userSaga } from "./redux/users/saga";

const reducers = {
    user: UserReducer, 
    chats: UserChatReducer
}

const rootReducer = combineReducers(reducers); 

const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
// sagas

function* appSaga() {
    yield all([chatsSaga(), userSaga()])
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(appSaga); 


type FirstArg<TFunction> = TFunction extends (arg: infer TArg, ...rest: any[]) => any ? TArg : any;
type State<TReducerMap> = {
    [P in keyof TReducerMap]: Exclude<FirstArg<TReducerMap[P]>, undefined>;
};

export type AppState = State<typeof reducers>