import axios from '../../axios/index';

const getAuctionProductList = ({page, limit}) => {
  return axios.post('/api/admin/product/getAuctionProductList', {page,limit});
};

const deleteAuctionProduct = (data) => {
  return axios.post('/api/admin/product/deleteAuctionProduct', data);
};

const adminProductApi = {
  getAuctionProductList,
  deleteAuctionProduct,
};

export default adminProductApi;