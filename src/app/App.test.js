import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders <App /> without crash", () => {
	const { getByRole } = render(<App />);
	expect(getByRole("progressbar")).toBeTruthy();
});
