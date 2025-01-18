const { Model, DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize) => {
	class Image extends Model {
		static associations() {}
	}
	Image.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
			},
			urls: {
				type: DataTypes.JSON,
				defaultValue: [],
			},
		},
		{
			sequelize,
			tableName: "Image",
			timestamps: true,
		}
	);
	return Image;
};
