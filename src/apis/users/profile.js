import axios from '../../axios/index';

const getProfile = () => {
  return axios.get('/api/bidder/profile');
};
const accNewPassword = ({ userId, newpassword, oldpassword }) => {
    return axios.post('/api/bidder/update-password', {
        accId: userId,
        newPassword: newpassword,
        oldPassword: oldpassword,
    });
};

const accUpdateprofile = ({ email, fullName, birthday, phoneNumber }) => {
    return axios.post('/api/bidder/update-profile', {
        email,
        fullName,
        birthday,
        phoneNumber
    });
};

const getListFavoriteProduct = ({ page, limit }) => {
    return axios.post('/api/bidder/get-list-favorite-product', {
        page,
        limit
    });
};

const getListJoiningProduct = ({ page, limit }) => {
    return axios.post('/api/bidder/get-list-joining-product', {
        page,
        limit
    });
};

const getListHighestPriceProduct = ({ page, limit }) => {
    return axios.post('/api/bidder/get-list-highestPrice-product-bidder', {
        page,
        limit
    });
};

const getListComment = ({ page, limit }) => {
    return axios.post('/api/bidder/get-list-comment', {
        page,
        limit
    });
};

const addComment = ({ Comment, Status, prodId }) => {
    return axios.post('/api/bidder/add-comment', {
        Comment,
        Status,
        prodId
    });
};

const deleteProductInWatchList = ({ id }) => {
    return axios.post( `/api/bidder/favorite-product/delete/${id}`);
};
const profileApi = {
    getProfile,
    accNewPassword,
    accUpdateprofile,
    getListFavoriteProduct,
    getListJoiningProduct,
    getListHighestPriceProduct,
    deleteProductInWatchList,
    getListComment,
    addComment
  };
  export default profileApi;