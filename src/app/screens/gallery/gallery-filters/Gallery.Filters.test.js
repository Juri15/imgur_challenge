import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "../../../slices";
import GalleryFilters from "./Gallery-Filters";
import { galleryFilters } from "../../../slices/gallery/gallery";

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

test('Switch name="viral" text should be "Show Viral"', () => {
	const { getByText } = render(renderWithRedux(<GalleryFilters />));
	expect(getByText("Show Viral")).toBeTruthy();
});

test('Switch name="viral" default value should be checked', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId("ig-filter-form")).toHaveFormValues({
		viral: true,
	});
});

test('Switch name="viral" on click, switch should be unchecked', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	fireEvent.click(getByTestId("ig-switch"));
	expect(getByTestId("ig-filter-form")).toHaveFormValues({
		viral: false,
	});
});

test('Select name="section" default value should be "user"', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId("ig-filter-form")).toHaveFormValues({
		section: "user",
	});
});

test('Select name="sort" default value should be "viral"', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId("ig-filter-form")).toHaveFormValues({
		sort: "viral",
	});
});

test('Select name="sort" rising only available with user section', () => {
	const filterState = {
		...store.getState()["gallery"]["galleryParams"]["keyValues"],
		section: "user",
	};
	store.dispatch(galleryFilters(filterState));
	expect(
		store.getState()["gallery"]["galleryParams"]["keyValues"]["sort"]
			.disabled
	).not.toBeTruthy();
});

test('Select name="window" default value should be "all"', () => {
	const { getByTestId } = render(renderWithRedux(<GalleryFilters />));
	expect(getByTestId("ig-filter-form")).toHaveFormValues({
		window: "all",
	});
});
