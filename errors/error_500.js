class error_500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = error_500;