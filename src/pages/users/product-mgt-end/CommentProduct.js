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
import {getCommentByProducts} from '../../../reducers/users/product';
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

  const closeModalHandler = () => {
    onClose();
  };

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
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nhận xét</th>
                    <th>Người gửi</th>
                    <th>Tên sản phẩm</th>
                    <th>Loại đánh giá</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {itemInfo?.length > 0 &&
                    itemInfo.map((row, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{row?.acom_note}</td>
                        <td>{row?.acc_full_name}</td>
                        <td>{row?.prod_name}</td>
                        <td>{row?.acom_status_rating}</td>
                        <td>{row?.acom_created_date}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </Box>
      </div>
      </ProductModal>
    </>
  );
};

export default CommentProduct;
