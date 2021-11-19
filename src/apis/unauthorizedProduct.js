import axios from '../axios/index';
/**
 * @param  {object} data
 * @param {string} data.cateId category ID
 * @param {string} data.cateName category name
 */
const getProductDetail = (id) => {
  let query = `/unauthorized-api/product/details/${id}`;
  return axios.get(query);
};

const searchProduct = (searchKey, limit, page, orderBy, filterField, AndOrCondition) => {
  let query = `/unauthorized-api/product/search`;
  return axios.post(query, {
    searchKey,
    limit,
    page,
    orderBy,
    filterField,
    AndOrCondition
  });
}

const getProductByCategory = (page, limit, catID, prodID) => {
  let query = `unauthorized-api/product/list-same-cat`;
  return axios.post(query, {
    page,
    limit,
    catID,
    prodID
  });
}

const listProductAboutToEnd = (page = 1, limit = 5) => {
  let query = `unauthorized-api/home/top-product-about-to-end`;
  return axios.post(query, {
    page,
    limit
  });
};

const listProductHighestPrice = (page = 1, limit = 5) => {
  let query = `unauthorized-api/home/top-product-have-highest-price`;
  return axios.post(query, {
    page,
    limit
  });
};

const listProductHighestBid = (page = 1, limit = 5) => {
  let query = `unauthorized-api/home/top-product-have-highest-bids`;
  return axios.post(query, {
    page,
    limit
  });
};

const unauthorizedProduct = {
  getProductDetail,
  listProductAboutToEnd,
  listProductHighestPrice,
  listProductHighestBid,
  getProductByCategory,
  searchProduct
};

export default unauthorizedProduct;
