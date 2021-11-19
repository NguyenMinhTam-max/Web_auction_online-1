import { Container, Button, Tabs, Tab, Table, Alert } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory, cancelHistory, confirmHistory } from '../../../reducers/historyBid';
import Pagination from '@material-ui/lab/Pagination';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import BiddingModel from '../../../components/bidder/bidding';
import HeaderClear from '../../../components/Layout/HeaderClear';

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
    const [keys, setKeys] = useState('bid');
    var [page, setPage] = useState(1);
    var limit = 5;
    var prodId = 1;
    const [status, setStatus] = useState(0);
    const data = useSelector((state) => state.history.data);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const [showFailed, setShowFailed] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [text, setText] = useState('');

    const handleClose = () => {
        setOpenModal(false);
    };

    const openModalHandler = () => {
        setOpenModal(true);
    };

    const getListHistoryHandler = useCallback(async ({ page, limit, prodId, status }) => {
        try {
            await dispatch(getListHistory({ page, limit, prodId, status })).unwrap();
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    const ConfirmHandler = async (hisId, { page, limit, prodId, status }) => {
        try {
            await dispatch(confirmHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 2 });
            setText('Xác nhận lượt đấu giá thành công!!!');
            setShowSuccess(true);
        } catch (err) {
            setText(err);
            setShowFailed(true);
        }
    };

    const CancelStatus2Handler = async (hisId, { page, limit, prodId, status }) => {
        try {
            await dispatch(cancelHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 2 });
            setText('Từ chối lượt đấu giá thành công!!!');
            setShowSuccess(true);
        } catch (err) {
            setText(err);
            setShowFailed(true);
        }
    };

    const CancelStatus0Handler = async (hisId, { page, limit, prodId, status }) => {
        try {
            await dispatch(cancelHistory({ hisId })).unwrap();
            getListHistoryHandler({ page, limit, prodId, status: 0 });
            setText('Từ chối lượt đấu giá thành công!!!');
            setShowSuccess(true);
        } catch (err) {
            setText(err);
            setShowFailed(true);
        }
    };


    useEffect(() => {
        if (keys === 'bid') {
            setStatus(0)
        }
        else if (keys === 'confirm') {
            setStatus(2)
        }
        else if (keys === 'cancel') {
            setStatus(3)
        }
        getListHistoryHandler({ page, limit, prodId, status });
    }, [getListHistoryHandler, page, limit, prodId, status, keys]);

    const handleVisible = useCallback(() => {
        if (showFailed === true || showSuccess === true) {
            setTimeout(() => {
                setShowFailed(false)
                setShowSuccess(false)
            }, 5000);
        }
    }, [showFailed, showSuccess]);

    useEffect(() => {
        handleVisible();
    }, [handleVisible]);
    
    return (
        <div>
            <HeaderClear />
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
                <Tabs id="controlled-tab-example"
                    activeKey={keys}
                    onSelect={(k) => setKeys(k)}
                    className="mb-3">
                    <Tab eventKey="bid" title="Đấu giá">
                        <Button variant="primary" size="small" onClick={() => openModalHandler()}><BsCheckLg /> đấu giá</Button>
                        <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời điểm</th>
                                        <th>Người mua</th>
                                        <th>Giá</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.historyList?.length > 0 &&
                                        data.historyList.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1 + (page - 1) * 10}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.his_price} VNĐ</td>
                                                <td>
                                                <Button variant="danger" size="small" onClick={() => CancelStatus0Handler(row.his_id, { page, limit, prodId, status })}><BsXLg /> Từ chối</Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className={`${classes.pagination} ${classes.section}`}>
                            <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                        </div>
                    </Tab>
                    <Tab eventKey="confirm" title="Xác nhận">
                        <div>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Thời điểm</th>
                                        <th>Người mua</th>
                                        <th>Giá</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.historyList?.length > 0 &&
                                        data.historyList.map((row, index) => (
                                            <tr key={index * 2}>
                                                <td>{index + 1}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.his_price} VNĐ</td>
                                                <td>
                                                    <Button variant="primary" size="small" onClick={() => ConfirmHandler(row.his_id, { page, limit, prodId, status })}><BsCheckLg /> Xác nhận</Button>
                                                    <Button variant="danger" size="small" onClick={() => CancelStatus2Handler(row.his_id, { page, limit, prodId, status })}><BsXLg /> Từ chối</Button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className={`${classes.pagination} ${classes.section}`}>
                            <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                        </div>
                    </Tab>
                    <Tab eventKey="cancel" title="Bị từ chối">
                        <div>
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
                                            <tr key={index * 3}>
                                                <td>{index + 1}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.his_price} VNĐ</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className={`${classes.pagination} ${classes.section}`}>
                            <Pagination count={data.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}

export default HistoryBid;