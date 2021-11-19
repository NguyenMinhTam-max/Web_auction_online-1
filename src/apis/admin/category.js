import axios from '../../axios/index';

const getListCategory = ({ page, limit }) => {
  return axios.post('/api/categories/list-parent', {
    page: page,
    limit: limit,
  });
};

const addCategory = ({catName}) => {
  return axios.post('/api/categories/add-parent', {
    catName
  });
};


const updateCategory = ({ catID, catName, catParentID  }) => {
  return axios.post('/api/categories/update', {
    catID,
    catName,
    catParentID
  });
};

const deleteCategory = ({ catID  }) => {
  return axios.post('/api/categories/delete', {
    catID
  });
};

const authApi = {
  getListCategory,
  addCategory,
  updateCategory,
  deleteCategory
};
export default authApi;
