import { Container, Table, Button, Alert } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory } from '../../../reducers/historyBid';
import { bidAddWatchList, bidDeleteWatchList } from '../../../reducers/users/bidder';
import Pagination from '@material-ui/lab/Pagination';
import HeaderClear from '../../../components/Layout/HeaderClear';
import BiddingModel from '../../../components/bidder/bidding';

import {
    makeStyles
  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    section: {
      borderRadius: theme.shape.borderRadius,
      background: 'white',
      boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    pagination: {
      '& > *': {
        justifyContent: 'center',
        display: 'flex',
      },
    }
}));

function HistoryBid() {
    const classes = useStyles();
    var [page, setPage] = useState(1);
    var limit = 5;
    var prodId = 1;
    var favId = 14;
    const status = 0;
    const data = useSelector((state) => state.history.data);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [text, setText] = useState('');

    const handleVisible = useCallback(() => {
        if (showFailed === true || showSuccess === true) {
            setTimeout(() => {
                setShowFailed(false)
                setShowSuccess(false)
            }, 5000);
        }
    }, [showFailed, showSuccess]);

    const handleClose = () => {
        setOpenModal(false);
    };

    const openModalHandler = () => {
        setOpenModal(true);
    };

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status }) => {
        try {
            await dispatch(getListHistory({ page, limit, prodId, status })).unwrap();
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    const addWatchList = useCallback(async ({ prodId}) => {
        try {
            await dispatch(bidAddWatchList({ prodId})).unwrap();
            setText('Thêm sản phẩm vào danh sách yêu thích thành công! ')
            setShowSuccess(true)
        } catch (err) {
            setText(err)
            setShowFailed(true)
        }
    }, [dispatch]);

    const deleteWatchList = useCallback(async ({ favId}) => {
        try {
            await dispatch(bidDeleteWatchList({ favId })).unwrap();
            setText('Xóa sản phẩm khỏi danh sách yêu thích thành công! ')
            setShowSuccess(true)
        } catch (err) {
            setText(err)
            setShowFailed(true)
        }
    }, [dispatch]);

    useEffect(() => {
        getListHistoryHandler({ page, limit, prodId, status });
    }, [getListHistoryHandler, page, limit, prodId, status]);

    useEffect(() => {
        handleVisible();
    }, [handleVisible]);

    console.log(data)

    return (
        <div>
            <HeaderClear/>
            <Container>
            <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>

            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>
            <BiddingModel
                    isOpen={openModal}
                    onClose={handleClose}
                    prod_id={prodId}
                    getList={() => { getListHistoryHandler({ page, limit, prodId, status }) }}
                />
                <div>
                <Button variant="primary" size="small" onClick={() => openModalHandler()}> đấu giá</Button>
                <Button variant="info" size="small" onClick={() => addWatchList({ prodId})}> Thêm vào yêu thích</Button>
                <Button variant="danger" size="small" onClick={() => deleteWatchList({favId})}> Xóa khỏi danh sách yêu thích</Button>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Thời điểm</th>
                                <th>Người mua</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.historyList?.length > 0 &&
                                data.historyList.map((row, index) => (
                                    <tr key={index}>
                                        <td>{index + 1 + (page - 1) * 10}</td>
                                        <td>{row.his_created_date}</td>
                                        <td>{row.acc_full_name}</td>
                                        <td>{row.his_price}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
                <div className={`${classes.pagination} ${classes.section}`}>
                    <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                </div>
            </Container>
        </div>
    );
}

export default HistoryBid;