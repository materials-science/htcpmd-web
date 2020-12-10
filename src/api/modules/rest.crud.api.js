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
      data: obj
    });
  },

  UpdateObj(apiPrefix, obj = {}) {
    return request({
      url: apiPrefix,
      method: "put",
      data: obj
    });
  },

  DelObj(apiPrefix, id) {
    return request({
      url: `${apiPrefix}/${id}/`,
      method: "delete"
    });
  },

  GetObj(apiPrefix, id) {
    return request({
      url: `${apiPrefix}/${id}/`,
      method: "get"
    });
  }
});
