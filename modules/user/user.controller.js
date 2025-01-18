const userService = require("./user.service");
const { Response } = require("../../helpers/response");

exports.signUpController = async (req, res, next) => {
	try {
		const { status, code, message, data } = await userService.userSignup(
			req.body
		);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log("🚀 ~ exports.signUpController= ~ error:", error);
		Response.serverError(res);
	}
};

exports.LoginController = async (req, res, next) => {
	try {
		const { status, code, message, data } = await userService.userLogin(
			req.body
		);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log("🚀 ~ exports.LoginController= ~ error:", error);
		Response.serverError(res);
	}
};

exports.forgotPasswordController = async (req, res, next) => {
	try {
		const { status, code, message, data } = await userService.forgotPassword(
			req.body
		);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log("🚀 ~ exports.forgotPasswordController= ~ error:", error);
		Response.serverError(res);
	}
};

exports.resetPasswordController = async (req, res, next) => {
	try {
		const { status, code, message, data } = await userService.resetPassword(
			req.body
		);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log("🚀 ~ exports.resetPasswordController= ~ error:", error);
		Response.serverError(res);
	}
};

exports.getProfileController = async (req, res, next) => {
	try {
		const { status, code, message, data } = await userService.getProfile(
			req.user
		);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log("🚀 ~ exports.getProfileController= ~ error:", error);
		Response.serverError(res);
	}
};

exports.uploadWaterMarkedImagesController = async (req, res, next) => {
	try {
		const { status, code, message, data } =
			await userService.uploadWaterMarkedImages(
				req.files,
				req.formData.label,
				req.formData?.watermark
			);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log(
			"🚀 ~ exports.uploadWaterMarkedImagesController= ~ error:",
			error
		);
		Response.serverError(res);
	}
};

exports.uploadImagesController = async (req, res, next) => {
	try {
		const { status, code, message, data } = await userService.uploadImages(
			req.files,
			req.formData.label
		);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log(
			"🚀 ~ exports.uploadWaterMarkedImagesController= ~ error:",
			error
		);
		Response.serverError(res);
	}
};

exports.uploadImageForWaterMarkPurposeController = async (req, res, next) => {
	try {
		const { status, code, message, data } =
			await userService.uploadImageForWaterMarkPurpose(
				req.files,
				req.formData.label
			);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log(
			"🚀 ~ exports.uploadWaterMarkedImagesController= ~ error:",
			error
		);
		Response.serverError(res);
	}
};

exports.fetchUploadedImagesController = async (req, res, next) => {
	try {
		const payload = {
			...(req?.query?.limit && { limit: Number(req.query?.limit) }),
			...(req?.query?.page && { page: Number(req.query?.page) }),
			...(req?.query?.label && { label: String(req.query?.label) }),
		};
		const { status, code, message, data } =
			await userService.fetchUploadedImages(payload);
		return Response.send(res, status, code, message, data);
	} catch (error) {
		console.log("🚀 ~ exports.fetchUploadedImagesController= ~ error:", error);
		Response.serverError(res);
	}
};
