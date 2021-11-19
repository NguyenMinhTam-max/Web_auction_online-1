import axios from '../axios/index';

const getListHistory = ({ page, limit, prodId, status, sortByPrice }) => {

  let query = `/api/bid/history-product`;
  return axios.post(query, { page, limit, prodId, status, sortByPrice });
};

const confirmHistory = ({ hisId }) => {
    let query = `/api/bid/confirm-bid/${hisId}`;
    return axios.post(query);
};

const cancelHistory = ({ hisId }) => {
    let query = `/api/bid/cancel-bid/${hisId}`;
    return axios.post(query);
};
const historyApi = {
    getListHistory,
    confirmHistory,
    cancelHistory
};

export default historyApi;
