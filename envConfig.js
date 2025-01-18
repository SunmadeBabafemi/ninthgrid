const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	NODE_PORT: Number(process.env.NODE_PORT) || 2026,
	DB_NAME: process.env.DB_NAME,
	DB_HOST: process.env.DB_HOST,
	DB_USER: process.env.DB_USER,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_PORT: process.env.DB_PORT,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRY: process.env.JWT_EXPIRY,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PORT: process.env.REDIS_PORT,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
	REDIS_CACHE_TTL: process.env.REDIS_CACHE_TTL,
	CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
