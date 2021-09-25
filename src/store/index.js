import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "reducer/index";
//

// import authUserReducer from "containers/shared/Auth/Login/module/reducer";
// import movieEditReducer from "containers/admin/Movie/module/reducer";
// import allUserReducer from "containers/admin/User/module/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const { composeWithDevTools } = require("redux-devtools-extension");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const rootReducer = combineReducers({
//   authUserReducer,
//   allUserReducer,
//   movieEditReducer
// });

const persistConfig = {
  key: "root",
  storage,
  whitelist:["authUserReducer"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
//  const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
let persistor = persistStore(store);

export { store, persistor };







