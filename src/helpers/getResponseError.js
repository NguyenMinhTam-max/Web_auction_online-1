export const getResponseError = (error) => {
  const responseError = error.response?.data?.errorMessage;
  return (typeof responseError !== 'object' && responseError) || 'Đã có lỗi xảy ra!';
};
/*This is where we will get the error message*/