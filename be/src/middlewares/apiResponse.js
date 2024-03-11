function apiResponse(req, res, next) {
  // Save a reference to the original res.json() function
  const oldJson = res.json;

  // Override the res.json() function with a custom implementation
  res.json = function (obj) {
    // Create a new response object with the desired structure
    const response = {
      status: res.statusCode,
      success: res.statusCode >= 200 && res.statusCode < 300,
      data: obj,
    };

    // Call the original res.json() function with the new response object
    oldJson.call(res, response);
  };

  next();
}

module.exports = apiResponse;
