import axios from '../axios/index';
/**
 * @param  {object} data
 * @param {string} data.cateId category ID
 * @param {string} data.cateName category name
 */
const geHomepageCategory = () => {
  let query = `/unauthorized-api/home/list-cat-home`;
  return axios.get(query);
};

const getProductByCategory = (page, limit, catID) => {
  let query = `/unauthorized-api/product/list-by-cat`;
  return axios.post(query, {
    page,
    limit,
    catID
  });
}

const categoryApi = {
    geHomepageCategory,
    getProductByCategory
};

export default categoryApi;
