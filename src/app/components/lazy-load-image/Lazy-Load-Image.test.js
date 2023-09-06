import React from "react";
import { render } from "@testing-library/react";
import LazyLoadImage from "./Lazy-Load-Image";
import "../../../test/__mocks__/intersectionObserverMock";

test("[Lazy-Load-Image] renders a placeholder at the start", () => {
	const { getByTestId } = render(<LazyLoadImage />);
	const placeholderElement = getByTestId("ig-placeholder");
	expect(placeholderElement).toBeInTheDocument();
});
