export function responseSuccess(data, message = "ok", statusCode = 200) {
  return {
    status: "success",
    statusCode: statusCode,
    message: message,
    data: data,
  };
}

export function responseError(message = "Internal Server Error", statusCode = 500) {
  return {
    status: "error",
    statusCode: statusCode,
    message: message,
  };
}

export const helperFunctions = {
  // Add more generic helper functions here if needed
};
