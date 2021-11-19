import axios from '../../axios/index';

const getListSubCategory = ({ catParent, page, limit  }) => {
  return axios.post('/api/categories/list-child', {
    page: page,
    limit: limit,
    catParent : catParent
  });
};


const addSubCategory = ({ catName, catParentID  }) => {
  return axios.post('/api/categories/add-child', {
    catName,
    catParentID
  });
};




const authApi = {
    getListSubCategory,
    addSubCategory
};
export default authApi;
