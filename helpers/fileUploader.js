const { cloudinary } = require("../config");

exports.imageUploaderWatermarked = async (file, watermark) => {
	const watermarkedImageId = watermark
		? watermark
		: "Nigeria-food-security_frqn5b";
	try {
		console.log("Uploading to cloudinary");
		const { secure_url } = await cloudinary.uploader.upload(file, {
			folder: "ninthgrid_water_marked_images",
			// compressing images
			transformation: [
				{
					width: 480,
					// aspect_ratio: "1.0",
					crop: "fill",
				},
				{
					overlay: watermarkedImageId,
					opacity: 50,
					gravity: "south_east",
					width: 150,
					crop: "scale",
				},
				{ fetch_format: "webp" },
			],

			secure: true,
		});
		console.log("secure_url: ", secure_url);
		return secure_url;
	} catch (error) {
		console.log("imageUploader: ", error);
	}
};

exports.imageUploader = async (file) => {
	try {
		console.log("Uploading to cloudinary");
		const { secure_url, public_id } = await cloudinary.uploader.upload(file, {
			folder: "images",
			// compressing images
			transformation: [
				{
					width: 480,
					// aspect_ratio: "1.0",
					crop: "fill",
				},
				{ fetch_format: "jpg" },
			],

			secure: true,
		});
		console.log("public_id: ", public_id);
		console.log("secure_url: ", secure_url);
		return secure_url;
	} catch (error) {
		console.log("imageUploader: ", error);
	}
};

exports.imageUploaderForWaterMarks = async (file) => {
	try {
		console.log("Uploading to cloudinary");
		const { secure_url, public_id } = await cloudinary.uploader.upload(file, {
			// compressing images
			transformation: [
				{
					width: 480,
					// aspect_ratio: "1.0",
					crop: "fill",
				},
				{ fetch_format: "jpg" },
			],

			secure: true,
		});
		return { secure_url, public_id };
	} catch (error) {
		console.log("imageUploader: ", error);
	}
};
