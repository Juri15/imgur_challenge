import React, { Suspense } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import "./App.scss";
import Logo from "../assets/svg/logo.svg";
import ENV from "../environment";
import AppRouter from "./AppRouter";
import ScrollToTop from "./components/scroll-to-top/Scroll-To-Top";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#38805b",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#e01840",
			contrastText: "#ffffff",
		},
		error: {
			main: "#e74c3c",
		},
	},
});

const appStyles = {
	linearProgress: {
		backgroundColor: "var(--c1)",
	},
};

const App = () => {
	return (
		<section className="ig-app-root">
			<MuiThemeProvider theme={theme}>
				<Suspense
					fallback={
						<LinearProgress style={appStyles.linearProgress} />
					}
				>
					<BrowserRouter basename="/imgur_challenge">
						<header className="ig-header">
							<Link to={ENV().ROUTING.HOME}>
								<img src={Logo} alt="app-logo" />
							</Link>
						</header>
						<AppRouter />
					</BrowserRouter>
				</Suspense>
				<ScrollToTop />
			</MuiThemeProvider>
		</section>
	);
};

export default App;
