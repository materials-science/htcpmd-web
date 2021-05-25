import util from "@/libs/util";

export default ({
	service,
	request,
	serviceForMock,
	requestForMock,
	mock,
	faker,
	tools
}) => ({
	/**
	 * @description crud
	 * @param {Object} query
	 * @param {Object} data
	 */
	GetList(apiPrefix, query) {
		return request({
			url: apiPrefix,
			method: "get",
			params: query
		});
	},

	AddObj(apiPrefix, obj = {}) {
		return request({
			url: apiPrefix,
			method: "post",
			data: Object.assign(obj, util.cookies.get("uuid"))
		});
	},

	UpdateObj(apiPrefix, obj = {}) {
		return request({
			url: apiPrefix,
			method: "put",
			data: Object.assign(obj, util.cookies.get("uuid"))
		});
	},

	PatchObj(apiPrefix, obj = {}) {
		return request({
			url: apiPrefix,
			method: "patch",
			data: Object.assign(obj, util.cookies.get("uuid"))
		});
	},

	DelObj(apiPrefix, id) {
		return request({
			url: `${apiPrefix}${id}/`,
			method: "delete",
			data: {
				user: util.cookies.get("uuid")
			}
		});
	},

	PartialDelObj(apiPrefix, obj = {}) {
		return request({
			url: apiPrefix,
			method: "delete",
			data: Object.assign(obj, util.cookies.get("uuid"))
		});
	},

	GetObj(apiPrefix, id) {
		return request({
			url: `${apiPrefix}${id}/`,
			method: "get"
		});
	},

	DownloadJsonFile(url) {
		return request({
			url: ".." + url,
			method: "get"
		});
	}
});
