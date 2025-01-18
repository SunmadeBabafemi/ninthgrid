const { Router } = require("express");
const userCtrl = require("./user.controller");
const validateRequest = require("../../middlewares/validateRequest");
const userSchema = require("./user.schema");
const { isAuthorized } = require("../../middlewares/auth");
const { multerUpload } = require("../../config");
const { lumpBodyAndFiles } = require("../../middlewares/formData");

const router = Router();

router.post(
	"/signup",
	validateRequest(userSchema.userSignUpSchema, "body"),
	userCtrl.signUpController
);

router.post(
	"/login",
	validateRequest(userSchema.userLoginSchema, "body"),
	userCtrl.LoginController
);

router.post(
	"/forgot-password",
	validateRequest(userSchema.forgotPasswordSchema, "body"),
	userCtrl.forgotPasswordController
);

router.post(
	"/reset-password",
	validateRequest(userSchema.resetPasswordSchema, "body"),
	userCtrl.resetPasswordController
);

router.get("/profile", isAuthorized, userCtrl.getProfileController);
router.post(
	"/upload-plain-images",
	multerUpload.any(),
	lumpBodyAndFiles,
	validateRequest(userSchema.uploadImagesSchema, "formData"),
	userCtrl.uploadImagesController
);

router.post(
	"/upload-images-watermarked",
	multerUpload.any(),
	lumpBodyAndFiles,
	validateRequest(userSchema.uploadImagesSchema, "formData"),
	userCtrl.uploadWaterMarkedImagesController
);

router.post(
	"/upload-images-for-watermark",
	multerUpload.any(),
	lumpBodyAndFiles,
	validateRequest(userSchema.uploadImagesSchema, "formData"),
	userCtrl.uploadImageForWaterMarkPurposeController
);
router.get(
	"/get-images",
	validateRequest(userSchema.paginateSchema, "query"),
	userCtrl.fetchUploadedImagesController
);

module.exports = router;
