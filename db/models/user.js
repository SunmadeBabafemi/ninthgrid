const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
	class User extends Model {
		static associations() {}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING,
			},
			password: {
				type: DataTypes.STRING,
			},

			token: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			tableName: "User",
			timestamps: true,
		}
	);
	return User;
};
