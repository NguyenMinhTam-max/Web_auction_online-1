import { Container, Modal, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListHistory } from '../../reducers/historyBid';
import {getBidderComment} from '../../reducers/users/seller'
import Pagination from '@material-ui/lab/Pagination';
import NumberFormat from 'react-number-format';
import { Role } from '../../config/role';
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

function ListCommentSeller({ isOpen, onClose, bidder_id, bid_full_name }) {
    const classes = useStyles();
    var [page, setPage] = useState(1);
    var limit = 10;
    var bidderID = bidder_id;
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [commentList, setCommentList] = useState({})


    const pageChangeHandler = (event, value) => {
        setPage(value);
    };
 
    const getListCommentBidderHandler = useCallback(async ({ page, limit, bidderID }) => {
        try {
            //alert(page)
            const result = await dispatch(getBidderComment({ page, limit, bidderID })).unwrap();
            console.log(JSON.stringify(result))

            
            setCommentList(result)
            
        } catch (err) {
           
            alert(err);
        }
    }, [dispatch]);


    useEffect(() => {
       
        if (bidderID !== false && isAuthenticated && user.role == Role.Seller) {
            getListCommentBidderHandler({ page, limit, bidderID });
        }

    }, [getListCommentBidderHandler, page, limit, bidderID]);
    console.log(commentList)
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
                    <Modal.Title>Danh sách comment của người đấu giá {bid_full_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div>

                            <DropdownButton
                                id={`dropdown-variants-primary`}
                                variant={"outline-primary"}
                                title={"Sắp xếp"}
                                size="sm"
                                // onSelect={handleSelectSort}
                                className="mb-2"
                            >

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