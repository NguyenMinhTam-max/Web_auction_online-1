import { Container, Modal, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory } from '../../reducers/historyBid';
import { getSellerComment } from '../../reducers/users/bidder';
import Pagination from '@material-ui/lab/Pagination';
import NumberFormat from 'react-number-format';

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

function ListCommentSeller({ isOpen, onClose, prod_id }) {
    const classes = useStyles();
    var [page, setPage] = useState(1);
    var limit = 10;
    var prodID = prod_id;
    // const status = 0;
    // const data = useSelector((state) => state.history.data);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [commentList, setCommentList] = useState({})
    // const [sortByPrice, setSortByPrice] = useState('NON');
    // const [isActiveSort1, setIsActiveSort1] = useState(false);
    // const [isActiveSort2, setIsActiveSort2] = useState(false);
    // const [isActiveSort3, setIsActiveSort3] = useState(false);
    // const [hiddenText, setHiddenText] = useState(false);

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    const getListCommentSellerHandler = useCallback(async ({ page, limit, prodID }) => {
        try {
            //alert(page)
            //alert(prodID)
            const result = await dispatch(getSellerComment({ page, limit, prodID })).unwrap();

            // if (result.statusCode === 4) {
            //     setHiddenText(true);
            // }
            setCommentList(result)
           
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);

    // const handleSelectSort = (event, eventKey) =>{
    //     if(Number(event) === 1){
    //         setSortByPrice('ASC');
    //         setIsActiveSort1(true);
    //         setIsActiveSort2(false);
    //         setIsActiveSort3(false);
    //     }
    //     else if(Number(event) === 2){
    //         setSortByPrice('DESC');
    //         setIsActiveSort1(false);
    //         setIsActiveSort2(true);
    //         setIsActiveSort3(false);
    //     }
    //     else{
    //         setSortByPrice('NON');
    //         setIsActiveSort1(false);
    //         setIsActiveSort2(false);
    //         setIsActiveSort3(true);
    //     }
    // };

    useEffect(() => {
        if (prodID !== undefined && isAuthenticated) {
            getListCommentSellerHandler({ page, limit, prodID });
        }
    }, [getListCommentSellerHandler, page, limit, prodID]);
    // alert(JSON.stringify(commentList))
    return (
        <div>
            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{ justifyContent: 'center', marginTop: '10%', position: 'center' }}
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>Lịch sử đấu giá</Modal.Title> */}
                    <Modal.Title>Danh sách comment của Seller</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div>
                            {/* <h4 hidden={!hiddenText}>Sản phẩm chưa kết thúc, không thể xem lịch sử.</h4> */}
                            <DropdownButton
                                id={`dropdown-variants-primary`}
                                variant={"outline-primary"}
                                title={"Sắp xếp"}
                                size="sm"
                                // onSelect={handleSelectSort}
                                className="mb-2"
                            >
                                {/* <Dropdown.Item eventKey="1" active={isActiveSort1}>Giá tăng dần</Dropdown.Item>
                                <Dropdown.Item eventKey="2" active={isActiveSort2}>Giá giảm dần</Dropdown.Item>
                                <Dropdown.Item eventKey="3" active={isActiveSort3}>Mặt định</Dropdown.Item> */}
                            </DropdownButton>
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {/* <th>Thời điểm</th>
                                        <th>Người mua</th>
                                        <th>Giá</th> */}
                                        <th>Nguời đấu giá</th>
                                        <th>Nhận xét</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {data.historyList?.length > 0 &&
                                        data.historyList.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1 + ((page - 1) * limit)}</td>
                                                <td>{row.his_created_date}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td><NumberFormat
                                                    value={row.his_price}
                                                    variant="standard"
                                                    thousandSeparator={true}
                                                    suffix={' VND'}
                                                    displayType={'text'}
                                                /></td>
                                            </tr>
                                        ))} */}
                                        {commentList.commentList?.length > 0 &&
                                        commentList.commentList.map((row, index) => (
                                            <tr key={index}>
                                                <td>{index + 1 + ((page - 1) * limit)}</td>
                                                <td>{row.acc_full_name}</td>
                                                <td>{row.acom_note}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className={`${classes.pagination} ${classes.section}`}>
                            <Pagination count={commentList.numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListCommentSeller;