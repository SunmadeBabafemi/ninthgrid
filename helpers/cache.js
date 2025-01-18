const redisClient = require("../redis/index");
const { REDIS_CACHE_TTL } = require("../envConfig");

exports.getRedisData = async (key) => {
	let dataString;
	await redisClient.get(key).then((resp) => {
		dataString = resp;
		console.log("🚀 ~REDIS DATA FETCHED:");
	});
	return JSON.parse(dataString);
};

exports.saveRedisData = async (key, value, ttl) => {
	ttl = ttl || Number(REDIS_CACHE_TTL);
	const data = JSON.stringify(value);

	await redisClient.set(key, data, { ttl }).then((data) => {
		console.log("redis data saved successfully::", data);
	});
};

exports.deleteRedisData = async (key) => {
	console.info("deleting key for: %s ", key);
	await redisClient.del(key).then(() => {
		console.log("redis data deleted successfully");
	});
};

exports.updateRedisData = async (key, value) => {
	await this.deleteRedisData(key).then(async () => {
		await this.saveRedisData(key, value).then(() => {
			console.log("redis data updated successfully");
		});
	});
};
