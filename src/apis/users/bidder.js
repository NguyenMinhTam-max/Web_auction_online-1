import axios from '../../axios/index';

const bidProduct = ({ priceBid, prodId }) => {

  let query = `/api/bid/bid-product`;
  return axios.post(query, { priceBid, prodId });
};

const bidAllow = ({ accIsUpgrade }) => {

  let query = `/api/bid/allowSell`;
  return axios.post(query, { accIsUpgrade });
};
const bidAddWatchList = ({ prodId }) => {

  let query = `/api/bidder/favorite-product/add`;
  return axios.post(query, { prodId });
};

// const bidAddComment = ({ accSeller, accIsLike, accComment }) => {
//
//   let query = `/api/bidder/add-comment-seller`;
//   return axios.post(query, { prodId });
// };

const bidDeleteWatchList = ({ favId }) => {

  let query = `/api/bidder/favorite-product/delete/${favId}`;
  return axios.post(query);
};

const requestUpgrade = (data) => {
  return axios.post('/api/bidder/allowSell', {accIsUpgrade : 1});
};

const getSellerComment = ({ page, limit, prodID }) => {
  return axios.post('/api/bidder/get-seller-comment', {page, limit, prodID });
};

const bidderApi = {
    bidProduct,
    bidAllow,
    bidAddWatchList,
    bidDeleteWatchList,
    requestUpgrade,
    getSellerComment
};

export default bidderApi;
