exports.getPaginatedRecords = async (
	model,
	{
		limit: specifiedLimit = 800,
		page,
		data = {},
		order,
		selectedFields,
		exclusions,
	}
) => {
	try {
		const orderly = order ? order : "DESC";
		const limit = Math.min(specifiedLimit, 500); // restrict limit to 100
		const offset = 0 + (page - 1) * limit;
		let result;
		const count = await model.count({
			where: { ...data },
			order: [["createdAt", orderly]],
		});
		const modelData = count;
		if (Number(modelData) > 0) {
			result = await model.findAndCountAll({
				limit,
				offset,
				where: { ...data },
				order: [["createdAt", orderly]],
				attributes: selectedFields ? selectedFields : { exclude: exclusions },
			});
		}
		const altNoResult = {
			count: 0,
			rows: [],
		};
		return {
			data: Number(modelData) > 0 ? result : altNoResult,
			total: modelData,
			currentPage: page,
			hasNext: page * limit < modelData || false,
			hasPrevious: page > 1,
			perPage: limit,
			totalPages: Number(modelData) > 0 ? Math.ceil(modelData / limit) : 1,
		};
	} catch (err) {
		console.log(err);
	}
};
