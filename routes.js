const userRoutes = require("./modules/user/user.route");

module.exports = (app) => {
	app.use("/user", userRoutes);

	app.get("/", (req, res) => {
		res.send("Server Is Live");
	});
};
