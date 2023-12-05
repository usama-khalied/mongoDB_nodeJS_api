

class HttpResponse {
    constructor(id, code, status, message, response, pageSize = null, page = null, sort = null, totalCollections = null) {
      if (pageSize !== null && page !== null && sort !== null && totalCollections !== null) {
        this.pagination = new Pagination(pageSize, page, sort, totalCollections);
      }
      this.id = id;
      this.code = code;
      this.status = status;
      this.message = message;
      this.response = response;
    }
  }
  class Pagination {
    constructor(pageSize, page, sort, totalCollections) {
      this.pageSize = pageSize;
      this.page = page;
      this.sort = sort;
      this.totalCollections = totalCollections;
    }
  }
  
  module.exports = HttpResponse;
  