import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./app/slices";
import "./styles.scss";
import App from "./app/App";

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
	],
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
