import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../../../slices";
import { galleryNextPage, galleryReset } from "../../../slices/gallery/gallery";
import { fetchApi, proxyReset } from "../../../slices/proxy/proxy";
import { AppServices } from "../../../../app.config";
import {
	mockFailResponse,
	mockSuccessResponse,
} from "../../../../test/api-mock-data";

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
	],
});

test('[Paging] initial page number must be "0"', () => {
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(0);
});

test('[Paging] on first call to "galleryNextPage()" the page number must be "1"', () => {
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(0);
	store.dispatch(galleryNextPage());
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(1);
});

test('[Paging] on fifth call to "galleryNextPage()" the page number must be "5"', () => {
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(1);
	store.dispatch(galleryNextPage());
	store.dispatch(galleryNextPage());
	store.dispatch(galleryNextPage());
	store.dispatch(galleryNextPage());
	expect(store.getState().gallery.galleryParams.keyValues.page).toBe(5);
});

test('[API] call "fetchApi()" and validate status code equal to 200', () => {
	fetch.doMock();
	fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse()));
	store.dispatch(galleryReset());
	return store
		.dispatch(
			fetchApi(
				AppServices.GALLERY.FETCH.URL,
				store.getState().gallery.galleryParams
			)
		)
		.then(() => {
			expect(store.getState()["proxy"]["response"]["status"]).toBe(200);
		});
});

test('[API] call "fetchApi()" and validate if it contains at-least one item', () => {
	fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse()));
	store.dispatch(proxyReset());
	return store
		.dispatch(
			fetchApi(
				AppServices.GALLERY.FETCH.URL,
				store.getState().gallery.galleryParams
			)
		)
		.then(() => {
			const { data } = store.getState()["proxy"]["response"];
			expect(data && data[0]).not.toEqual({});
		});
});

test('[API] call "fetchApi()" multiple times and validate if old data persists', () => {
	fetch.mockResponses(
		[JSON.stringify(mockSuccessResponse()), {}],
		[JSON.stringify(mockSuccessResponse()), {}]
	);
	store.dispatch(proxyReset());
	const payload = store.getState().gallery.galleryParams;
	return store
		.dispatch(fetchApi(AppServices.GALLERY.FETCH.URL, payload))
		.then(() => {
			const response = store.getState()["proxy"]["response"]["data"];
			return store
				.dispatch(fetchApi(AppServices.GALLERY.FETCH.URL, payload))
				.then(() => {
					const response2 =
						store.getState()["proxy"]["response"]["data"];
					expect(response2.length).toBeGreaterThanOrEqual(
						response.length
					);
				});
		});
});

test('[API] handle "fetchApi()" exception with status code 400', () => {
	fetch.doMockOnce();
	fetch.mockReject(() => Promise.reject(mockFailResponse()));
	return store
		.dispatch(
			fetchApi(
				AppServices.GALLERY.FETCH.URL,
				store.getState().gallery.galleryParams
			)
		)
		.then(() => {
			expect(store.getState()["proxy"]["errors"]["status"]).toBe(400);
		});
});
