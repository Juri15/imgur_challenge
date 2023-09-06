import ENV from "./environment";

export const AppOptions = {
	IMGUR: {
		CLIENT_ID: "388356d576ac67e",
		ACCESS_TOKEN: "406d0515c82011855b8d35aabd580df44488cf94",
	},
};

export const AppServices = {
	GALLERY: {
		FETCH: {
			URL: `${ENV().REST_API}/gallery/{section}/{sort}/{window}/{page}`,
		},
	},
};

export const RequestHeaders = {
	get: {
		Authorization: `Client-ID ${AppOptions.IMGUR.CLIENT_ID}`,
	},
	post: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
};
