import axios from '../../axios/index';

const getAuctionProductList = ({page, limit}) => {
  return axios.post('/api/seller/getAuctionProductList', {page,limit});
};

const getAuctionProductEndList = ({page, limit}) => {
  return axios.post('/api/seller/getAuctionProductEndList', {page,limit});
};

const addComment = ({ Comment, Status, prodId }) => {
  return axios.post('/api/seller/add-comment', {
      Comment,
      Status,
      prodId
  });
};

const postAuctionProduct = (data) => {
  return axios.post('/api/seller/postAuctionProduct', data);
};

const updateAuctionProduct = (data) => {
  return axios.post('/api/seller/updateAuctionProductDescription', data);
};

const deleteAuctionProduct = ({prodId}) => {
  return axios.post('/api/seller/deleteAuctionProduct', {prodId});
};

const getCommentByProduct = ({prodId}) => {
  return axios.post('/api/seller/get-comment', {prodId});
};

const sellerProductApi = {
  getAuctionProductList,
  postAuctionProduct,
  updateAuctionProduct,
  deleteAuctionProduct,
  getAuctionProductEndList,
  addComment,
  getCommentByProduct
};

export default sellerProductApi;