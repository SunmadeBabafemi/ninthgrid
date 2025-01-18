const { Response } = require("../helpers/response");

exports.lumpBodyAndFiles = async (req, _res, next) => {
	try {
		const body = req?.body;
		const files = req?.files ? req.files : [];
		const file = req?.file;
		const formData = {
			...body,
			files,
			...(file && { file: file }),
		};
		req.formData = formData;
		return next();
	} catch (error) {
		console.log(error);
		const respo = {
			status: "error",
			code: HTTP_SERVER_ERROR,
			message: error.message,
			data: error,
		};
		return next(
			Response.send(_res, respo.status, respo.code, respo.data, respo.message)
		);
	}
};
