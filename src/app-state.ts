import { combineReducers, createStore } from "redux"
import { UserReducer } from "./redux/users/store/reducers"


const reducers = {
    user: UserReducer
}

const rootReducer = combineReducers(reducers); 

// const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export const store = createStore(
    rootReducer, 
    // composeE
);

type FirstArg<TFunction> = TFunction extends (arg: infer TArg, ...rest: any[]) => any ? TArg : any;
type State<TReducerMap> = {
    [P in keyof TReducerMap]: Exclude<FirstArg<TReducerMap[P]>, undefined>;
};

export type AppState = State<typeof reducers>