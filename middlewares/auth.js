const { User } = require("../db/models");
const { getRedisData } = require("../helpers/cache");
const { verifyJwt } = require("../helpers/encrypter");
const {
	HTTP_UNAUTHORIZED,
	HTTP_SERVER_ERROR,
} = require("../helpers/httpCodes");

exports.isAuthorized = async (req, _, next) => {
	try {
		const token =
			req.headers.authorization && req.headers.authorization.split(" ")[1];

		if (!token) {
			return next({
				status: "error",
				code: HTTP_UNAUTHORIZED,
				message: "Authorization token is missing.",
			});
		}
		const { id } = verifyJwt(token);
		if (!id) {
			return next({
				status: "error",
				code: HTTP_UNAUTHORIZED,
				message: "Authorization Failed",
			});
		}
		const redisUser = await getRedisData(id);
		const user = redisUser ? redisUser : await User.findOne({ where: { id } });
		if (!user) {
			return next({
				status: "error",
				code: HTTP_UNAUTHORIZED,
				message: "Unauthorized",
			});
		}
		req.user = user;
		req.token = token;
		req.userId = user.id;
		return next();
	} catch (error) {
		console.log("🚀 ~ exports.isAuthorized=async ~ error:", error);
		return next({
			status: "error",
			code: HTTP_SERVER_ERROR,
			message: error.toString(),
		});
	}
};
