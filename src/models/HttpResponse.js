 class HttpResponse {
  constructor(id, code, status,message, response) {
    this.id = id;
    this.code = code;
    this.status = status
    this.message = message;
    this.response = response;
  }
}

module.exports = HttpResponse;