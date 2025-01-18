const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const envConfig = require("../envConfig");

exports.verificationCode = () => {
	const code = Math.floor(1000 + Math.random() * 9000);
	return code;
};

exports.jwtSign = (payload) => {
	const data = {
		id: payload?.user_id || payload?.id,
		...(payload?.email && { email: payload.email }),
	};
	const signedToken = jwt.sign(data, envConfig.JWT_SECRET, {
		expiresIn: envConfig.JWT_EXPIRY,
	});
	return signedToken;
};

exports.verifyJwt = (token) => {
	return jwt.verify(token, envConfig.JWT_SECRET, (err, payload) => {
		if (err) {
			console.log("🚀 ~ jwt.verify ~ err:", err);
			return false;
		}
		return payload;
	});
};

exports.hashPassword = (password) => {
	const hash = bcrypt.hashSync(password, 12);
	return hash;
};

exports.validatePassword = (password, hashedPassword) => {
	return (valid = bcrypt.compareSync(password, hashedPassword));
};
