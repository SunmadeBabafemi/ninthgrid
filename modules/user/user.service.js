const { User, Otp, Image } = require("../../db/models/index.js");
const { Op } = require("sequelize");
const {
	responseObject,
	catchBlockResponse,
} = require("../../helpers/response");
const {
	imageUploader,
	imageUploaderWatermarked,
	imageUploaderForWaterMarks,
} = require("../../helpers/fileUploader.js");
const { getPaginatedRecords } = require("../../helpers/paginate.js");
const {
	saveRedisData,
	getRedisData,
	deleteRedisData,
	updateRedisData,
} = require("../../helpers/cache.js");
const {
	hashPassword,
	jwtSign,
	verifyJwt,
	validatePassword,
	verificationCode,
} = require("../../helpers/encrypter.js");

exports.userSignup = async (payload) => {
	try {
		const { email, password } = payload;
		const existingUser = await User.findOne({
			where: {
				email,
			},
		});
		if (existingUser) {
			return responseObject(400, "User with email already exists", null);
		}
		const hash = hashPassword(password);

		const newUser = await User.create({
			email,
			password: hash,
		});

		const token = jwtSign({
			id: newUser.id,
			email,
		});
		newUser.token = token;
		newUser.save();

		const redisKey = String(newUser.id);

		saveRedisData(redisKey, newUser);
		delete newUser.dataValues.password;

		return responseObject(201, "User created successfully", newUser);
	} catch (error) {
		console.log("🚀 ~ exports.userSignup=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.userLogin = async (payload) => {
	try {
		const { email, password } = payload;

		const existingUser = await User.findOne({
			where: {
				email,
			},
		});
		if (!existingUser) {
			return responseObject(400, "User with email does not exist", null);
		}
		const isPassWordCorrect = validatePassword(password, existingUser.password);
		if (!isPassWordCorrect) {
			return responseObject(400, "Password incorrect", null);
		}
		const newToken = jwtSign({
			id: existingUser.id,
			email,
		});
		existingUser.token = newToken;
		existingUser.save();

		//update redis data
		updateRedisData(String(existingUser.id), existingUser);
		delete existingUser.dataValues.password;

		return responseObject(201, "User logged in successfully", existingUser);
	} catch (error) {
		console.log("🚀 ~ exports.userSignup=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.forgotPassword = async (payload) => {
	try {
		const { email } = payload;

		const existingUser = await User.findOne({
			where: {
				email,
			},
		});
		if (!existingUser) {
			return responseObject(400, "User with email does not exist", null);
		}
		const code = String(verificationCode());
		const tokenOtp = jwtSign({
			id: existingUser.id,
			code,
		});

		const otpModel = await Otp.create({
			code,
			user_id: existingUser.id,
			token: tokenOtp,
		});
		return responseObject(201, "One time password sent successfully", otpModel);
	} catch (error) {
		console.log("🚀 ~ exports.userSignup=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.resetPassword = async (payload) => {
	try {
		const { otp, new_password } = payload;

		const existingOtp = await Otp.findOne({
			where: {
				code: otp,
			},
		});
		if (!existingOtp) {
			return responseObject(400, "Wrong Otp Entered", null);
		}
		const isValid = verifyJwt(existingOtp.token);
		if (!isValid) {
			return responseObject(400, "Otp Invalid or expired", null);
		}
		const redisUser = await getRedisData(isValid.id);

		const user = redisUser
			? redisUser
			: await User.findOne({
					where: {
						id: isValid.user_id,
					},
			  });

		if (!user) {
			return responseObject(400, "User Not Found", null);
		}
		const hash = hashPassword(new_password);
		const newToken = jwtSign({
			id: user.id,
			email: user.email,
		});
		console.log("🚀 ~ exports.resetPassword= ~ user:", user);

		user.password = hash;
		user.token = newToken;
		await User.update(user, {
			where: { id: user.id },
			returning: true,
		});
		const savedUser1 = await User.findOne({ where: { id: user.id } });

		Otp.destroy({
			where: {
				id: existingOtp.id,
			},
		});

		updateRedisData(user.id, savedUser1);
		return responseObject(200, "Password Reset successful", savedUser1);
	} catch (error) {
		console.log("🚀 ~ exports.userSignup=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.getProfile = async (user) => {
	try {
		return responseObject(200, "Profile Fetch successful", user);
	} catch (error) {
		console.log("🚀 ~ exports.getProfile=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.uploadImages = async (files, label) => {
	try {
		let images = [];
		if (files.length === 0) {
			return responseObject(400, "No images to upload");
		}
		for (const file of files) {
			console.log("🚀 ~ exports.uploadWaterMarkedImages= ~ file:", file);
			const url = await imageUploader(file.path);
			images.push(url);
		}

		const image = await Image.create({
			name: label,
			urls: images,
		});

		return responseObject(201, "images uploaded successfully", image);
	} catch (error) {
		console.log("🚀 ~ exports.uploadWaterMarkedImages=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.uploadWaterMarkedImages = async (files, label, watermark) => {
	try {
		let images = [];
		if (files.length === 0) {
			return responseObject(400, "No images to upload");
		}
		for (const file of files) {
			console.log("🚀 ~ exports.uploadWaterMarkedImages= ~ file:", file);
			const url = await imageUploaderWatermarked(file.path, watermark);
			images.push(url);
		}

		const image = await Image.create({
			name: label,
			urls: images,
		});

		return responseObject(201, "images uploaded successfully", image);
	} catch (error) {
		console.log("🚀 ~ exports.uploadWaterMarkedImages=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.fetchUploadedImages = async (payload) => {
	try {
		const { limit, page, label } = payload;
		const redisKey = JSON.stringify(payload);

		const redisFetch = await getRedisData(redisKey);
		if (redisFetch) {
			return responseObject(200, "images fetched successfully", redisFetch);
		}

		var records = await getPaginatedRecords(Image, {
			limit: limit ? Number(limit) : 10,
			page: page ? Number(page) : 1,
			...(label && {
				name: {
					[Op.iLike]: `%${label}`,
				},
			}),
		});
		saveRedisData(redisKey, records);

		return responseObject(200, "images fetched successfully", records);
	} catch (error) {
		console.log("🚀 ~ exports.uploadWaterMarkedImages=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};

exports.uploadImageForWaterMarkPurpose = async (files, label) => {
	try {
		let images = [];
		let public_ids = [];
		if (files.length === 0) {
			return responseObject(400, "No images to upload");
		}
		for (const file of files) {
			console.log("🚀 ~ exports.uploadWaterMarkedImages= ~ file:", file);
			const { secure_url, public_id } = await imageUploaderForWaterMarks(
				file.path
			);
			images.push(public_id);
		}

		const image = await Image.create({
			name: label,
			urls: images,
		});

		return responseObject(201, "images uploaded successfully", image);
	} catch (error) {
		console.log("🚀 ~ exports.uploadWaterMarkedImages=async ~ error:", error);
		return catchBlockResponse(error.toString());
	}
};
