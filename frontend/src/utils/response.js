export const getResponseMessage = (code) => {
  switch (code) {
    case 400:
      return 'Bad Request!';
    case 401:
      return 'Unauthorized!';
    case 403:
      return 'Forbidden!';
    case 404:
      return 'Not Found!';
    case 405:
      return 'API Not Accessible!';
    case 422:
      return 'Unprocessable Entity!';
    case 500:
      return 'Internal Server Error!';
    default:
      return 'Some error happened!';
  }
};