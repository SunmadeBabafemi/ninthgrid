const multer = require("multer");
const path = require("path");

const upload = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		// if (
		// 	ext !== ".jpg" &&
		// 	ext !== ".jpeg" &&
		// 	ext !== ".png" &&
		// 	ext !== ".pdf" &&
		// 	ext !== ".doc"
		// ) {
		// 	cb(new Error("File type not supported"), false);
		// 	return;
		// }
		cb(null, true);
	},
});

module.exports = upload;
