import axios from '../../axios/index';

const login = ({ email, password }) => {
  return axios.post('/unauthorized-api/auth/login', {
    email,
    passWord: password,
  });
};

const register = ({ username, password, email, fullName, phoneNumber }) => {
  return axios.post('/unauthorized-api/auth/register', {
    userName: username,
    passWord: password,
    email,
    fullName,
    phoneNumber,
  });
};

const verifyEmail = ({ userId, accessToken }) => {
  return axios.post('/unauthorized-api/auth/verification-email', {
    accId: userId,
    accToken: accessToken,
  });
};

const forgotPassword = (email) => {
  return axios.post('/unauthorized-api/auth/forgot-password', {
    email,
  });
};

const resetPassword = ({ userId, newPassword, code }) => {
  return axios.post('/unauthorized-api/auth/new-password', {
    accId: userId,
    accPassword: newPassword,
    tokenChangePass: code,
  });
};

const getUserInfoById = (userId) => {
  return axios.get(`/unauthorized-api/auth/verification-email/${userId}`);
};

const authApi = {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getUserInfoById,
};
export default authApi;
