const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
	class Otp extends Model {
		static associations() {}
	}
	Otp.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			code: {
				type: DataTypes.STRING,
			},
			user_id: {
				type: DataTypes.STRING,
			},
			token: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			tableName: "Otp",
			timestamps: true,
		}
	);
	return Otp;
};
