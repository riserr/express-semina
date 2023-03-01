//Create new class with error extending
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

//Export class
module.exports = CustomAPIError;
