import ProductModal from './ProductModal';
import {
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Table} from 'react-bootstrap';
// import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import React, { useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: '10vh',
  },
  content: {
    background: '#fff',
    padding: theme.spacing(2),
    minHeight: '500px',
  },
  title: {
    fontWeight: 'bold',
  },
}));

const CommentProduct = ({ itemInfo, isOpen, onClose, showSuccess, textAlert }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
	var limit = 5;
	var [page, setPage] = useState(1);
  // const [error, setError] = useState('');
	const dataComment = [];

  const pageChangeHandler = (event, value) => {
		setPage(value);
	};

  // const getListCategoryHandler = useCallback(async () => {
  //   try {
  //     await dispatch(getListCategory()).unwrap();
  //   } catch (err) {}
  // }, [dispatch]);

  const closeModalHandler = () => {
    onClose();
  };

  // useEffect(() => {
  //   getListCategoryHandler();
  // }, [dispatch, getListCategoryHandler]);

  return (
    <>
      <ProductModal isOpen={isOpen} onClose={closeModalHandler}>
      <div className={classes.root}>
      <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              Đánh giá sản phẩm
            </Typography>
          </Box>
            <div>
              {/* {dataComment.rating?.length > 0 &&
                dataComment.rating.map((row, index) => (
                  <tr key={index * 4}>
                    <td><p>Số lượt chập nhân: {row.acc_like_bidder}</p><p>Số lượt hủy: {row.acc_dis_like_bidder}</p></td>
                  </tr>
                ))} */}
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nhận xét</th>
                    <th>Người gửi</th>
                    <th>Tên sản phẩm</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {dataComment?.commentList?.length > 0 &&
                    dataComment?.commentList.map((row, index) => (
                      <tr key={index * 4}>
                        <td>{index + 1 + ((page - 1) * limit)}</td>
                        <td>{row?.acom_note}</td>
                        <td>{row?.acc_full_name}</td>
                        <td>{row?.prod_name}</td>
                        <td>{row?.acom_created_date}</td>
                      </tr>
                    ))} */}
                </tbody>
              </Table>
            </div>
          {/* <div className={`${classes.pagination} ${classes.section}`}>
            <Pagination count={dataComment?.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
          </div> */}
          </Box>
      </div>
      </ProductModal>
    </>
  );
};

export default CommentProduct;
