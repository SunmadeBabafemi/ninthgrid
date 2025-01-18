const db = require("./db/models");
const {
	userSignup,
	userLogin,
	forgotPassword,
} = require("./modules/user/user.service");
const app = require("./app");
const envConfig = require("./envConfig");

db.sequelize.sync();

app.use((err, req, res, next) => {
	if (err.name == "UnauthorizedError") {
		res.status(401).json({ error: "Unauthorized" });
	}
});

const port = envConfig.NODE_PORT;

app.listen(port, () => {
	console.log("app listening on port:: ", port);
});
