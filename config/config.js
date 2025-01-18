const envConfig = require("../envConfig");

module.exports = {
	development: {
		username: envConfig.DB_USER,
		password: envConfig.DB_PASSWORD,
		database: envConfig.DB_NAME,
		host: envConfig.DB_HOST,
		dialect: "mysql",
	},
};
