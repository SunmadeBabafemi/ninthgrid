const redis = require("redis");
const envConfig = require("../envConfig");
const url = `redis://${envConfig.REDIS_HOST}:${envConfig.REDIS_PORT}`;

const redisClient = redis.createClient({ url });

//init redis
redisClient;
(async () => {
	await redisClient.connect();
})();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.on("connect", () => {
	console.log("Redis Connected!");
});
redisClient.on("reconnecting", () =>
	console.log("redis client is reconnecting")
);
redisClient.on("ready", () => console.log("redis client is ready"));

module.exports = redisClient;
