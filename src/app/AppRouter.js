import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import ENV from "../environment/index";

const ImgurGallery = lazy(() => import("./screens/gallery/Imgur-Gallery"));
const Error404 = lazy(() => import("./screens/404/Error404"));

const AppRouter = () => {
	return (
		<Switch>
			<Route exact path={ENV().ROUTING.HOME} component={ImgurGallery} />
			<Route exact from="*" component={Error404} />
		</Switch>
	);
};
export default AppRouter;
