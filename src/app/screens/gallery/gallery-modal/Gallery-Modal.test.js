import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../../../slices";
import { fetchApi } from "../../../slices/proxy/proxy";
import { AppServices } from "../../../../app.config";
import GalleryList from "../gallery-list/Gallery-List";
import GalleryModal from "./Gallery-Modal";
import "../../../../test/__mocks__/intersectionObserverMock";
import { mockSuccessResponse } from "../../../../test/api-mock-data";

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
	],
});

const renderWithRedux = (component) => {
	return <Provider store={store}>{component}</Provider>;
};

test("[Gallery Modal] validate if modal opens on fire event", () => {
	fetch.doMockOnce();
	fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse()));

	return store
		.dispatch(
			fetchApi(
				AppServices.GALLERY.FETCH.URL,
				store.getState().gallery.galleryParams
			)
		)
		.then(() => {
			const { getByTestId } = render(renderWithRedux(<GalleryList />));
			const { getByText } = render(
				renderWithRedux(
					<GalleryModal
						openModal={{
							cover: "",
							title: "test",
						}}
					/>
				)
			);

			fireEvent.click(getByTestId("ig-item-button-0"));
			expect(getByText("test")).toBeVisible();
		});
});
