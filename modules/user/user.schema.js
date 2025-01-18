// const Joi = require("joi").extend(require("@joi/date"));
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const fileUploadSchema = Joi.object().keys({
	fieldname: Joi.string().required(),
	originalname: Joi.string().required(),
	mimetype: Joi.string().required(),
	encoding: Joi.string().required(),
	destination: Joi.string().required(),
	filename: Joi.string().required(),
	path: Joi.string().required(),
	size: Joi.number().positive().required(),
});

exports.userSignUpSchema = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

exports.userLoginSchema = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

exports.forgotPasswordSchema = Joi.object().keys({
	email: Joi.string().required(),
});

exports.resetPasswordSchema = Joi.object().keys({
	otp: Joi.string().required(),
	new_password: Joi.string().required(),
});

exports.uploadImagesSchema = Joi.object().keys({
	label: Joi.string().required(),
	watermark: Joi.string().optional(),
	files: Joi.array().min(1).required(),
});

exports.paginateSchema = Joi.object().keys({
	limit: Joi.number().positive().default(10).optional(),
	page: Joi.number().positive().default(1).optional(),
});
