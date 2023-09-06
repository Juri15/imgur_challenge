const mockSuccessResponse = () => {
	return {
		success: true,
		status: 200,
		data: [
			{
				id: "JikGoHs",
				ups: 200,
				downs: 400,
			},
			{
				id: "3mv46f9",
				ups: 200,
				downs: 400,
			},
		],
	};
};

const mockFailResponse = () => {
	return {
		success: false,
		status: 400,
		data: null,
	};
};

export { mockSuccessResponse, mockFailResponse };
