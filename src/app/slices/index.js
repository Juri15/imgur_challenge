import { combineReducers } from "redux";
import proxyReducer from "./proxy/proxy";
import galleryReducer from "./gallery/gallery";

const rootReducer = combineReducers({
	proxy: proxyReducer,
	gallery: galleryReducer,
});
export default rootReducer;
