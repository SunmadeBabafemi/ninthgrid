const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const OtpModel = require("./otp");
const ImageModel = require("./image");
const envConfig = require("../../envConfig");

const sequelize = new Sequelize(
	envConfig.DB_NAME,
	envConfig.DB_USER,
	envConfig.DB_PASSWORD,
	{
		host: envConfig.DB_HOST,
		password: envConfig.DB_PASSWORD,
		database: envConfig.DB_NAME,
		port: Number(envConfig.DB_PORT),
		dialect: "mysql",
	}
);

const User = UserModel(sequelize);
const Otp = OtpModel(sequelize);
const Image = ImageModel(sequelize);

const db = {
	Sequelize,
	sequelize: sequelize,
	User: User,
	Otp: Otp,
	Image: Image,
};

module.exports = db;
