import { RequestHeaders } from "../../../app.config";

const addHeaders = (postApi) => {
	const headerValues = postApi ? RequestHeaders.post : RequestHeaders.get;
	const headers = {};

	if (Object.keys(headerValues).length !== 0) {
		Object.keys(headerValues).forEach((key) => {
			headers[key] = headerValues[key];
		});
	}

	return {
		headers,
	};
};

const addQueryParamsToUrl = (url, queryParams) => {
	let params = "";
	let firstItem = true;

	if (queryParams !== null && Object.keys(queryParams).length !== 0) {
		Object.keys(queryParams).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
				if (firstItem) {
					params = "?";
					firstItem = false;
				} else {
					params += "&";
				}

				if (queryParams[key] instanceof Array) {
					let nestedFirstItem = false;
					queryParams[key].forEach((value) => {
						if (nestedFirstItem) {
							params = "?";
							nestedFirstItem = false;
						} else {
							params += "&";
						}

						params = params.concat(key).concat("=").concat(value);
					});
				} else {
					params = params
						.concat(key)
						.concat("=")
						.concat(queryParams[key]);
				}
			}
		});
	}
	return url + params;
};

const addMatrixParamsToUrl = (url, matrixParams) => {
	let newUrl = url;
	if (matrixParams) {
		Object.keys(matrixParams).forEach((key) => {
			newUrl = newUrl
				.concat(";")
				.concat(key)
				.concat("=")
				.concat(matrixParams[key]);
		});
	}
	return newUrl;
};

const addPathParams = (url, pathParams) => {
	let newUrl = url;
	if (pathParams) {
		Object.keys(pathParams).forEach((param) => {
			if (Object.prototype.hasOwnProperty.call(pathParams, param)) {
				newUrl = newUrl.replace(`:${param}`, pathParams[param]);
			}
		});
	}
	return newUrl;
};

const addKeyValues = (url, keyValues) => {
	let newUrl = url;
	if (keyValues) {
		Object.keys(keyValues).forEach((key) => {
			if (Object.prototype.hasOwnProperty.call(keyValues, key)) {
				const value =
					typeof keyValues[key] === "object"
						? keyValues[key]["value"]
						: keyValues[key];
				newUrl = newUrl.replace(`{${key}}`, value);
			}
		});
	}
	return newUrl;
};

export {
	addHeaders,
	addQueryParamsToUrl,
	addMatrixParamsToUrl,
	addPathParams,
	addKeyValues,
};
