class Pagination {
  constructor(pageSize, page, sort, totalCollections) {
    this.pageSize = pageSize;
    this.page = page;
    this.sort = sort;
    this.totalCollections = totalCollections;
  }
}

class HttpResponse {
  constructor(id, code, status, message, response, pageSize, page, sort, totalCollections) {
    this.pagination = new Pagination(pageSize, page, sort, totalCollections);
    this.id = id;
    this.code = code;
    this.status = status;
    this.message = message;
    this.response = response;
  }
}

module.exports = HttpResponse;
