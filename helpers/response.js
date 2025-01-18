class HandleResponse {
	send = (res, status, code, message, data = null) => {
		return res.status(code).json({
			status,
			code,
			message,
			data,
		});
	};
	serverError = (res) => {
		return res.status(500).json({
			status: "error",
			code: 500,
			message: "Internal Server Error",
		});
	};
}

const responseObject = (code, message, data = null) => {
	return {
		status: code < 400 ? "success" : "error",
		code,
		message,
		data,
	};
};

const catchBlockResponse = (message = "Internal server error") => {
	return {
		status: "error",
		code: 500,
		message,
	};
};

module.exports = {
	Response: new HandleResponse(),
	responseObject,
	catchBlockResponse,
};
