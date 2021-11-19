import axios from '../../axios/index';

const getUserList = ({ page, limit, role }) => {
  return axios.post('/api/admin/user/list-by-role', { page, limit, role });
};

// const postAuctionProduct = (data) => {
//   return axios.post('/api/seller/postAuctionProduct', data);
// };

// const updateAuctionProduct = (data) => {
//   return axios.post('/api/seller/updateAuctionProduct', data);
// };

const deleteUser = (data) => {
  return axios.post('/api/admin/user/deleteUser', data);
};

const acceptSel = (data) => {
  return axios.post('/api/admin/user/acceptSel', data);
};

const rejectSel = (data) => {
  return axios.post('/api/admin/user/rejectSel', data);
};



const adminUserApi = {
  getUserList,
  // postAuctionProduct,
  // updateAuctionProduct,
  acceptSel,
  rejectSel,
  deleteUser
};

export default adminUserApi;