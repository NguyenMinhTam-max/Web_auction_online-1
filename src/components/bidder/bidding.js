import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { bidProduct } from '../../reducers/users/bidder';
import ConfirmModel from './confirm';
import NumberFormat from 'react-number-format';


function Bidding({ isOpen, onClose, prod_id }) {
    var [priceBid, setPriceBid] = useState(0);
    var prodId = prod_id;
    const [openModal, setOpenModal] = useState(false);
    const priceBids = useRef(0);

    // const onChangeHandler = (value) => {
    //     setPriceBid(value);
    // };

    const openModalHandler = () => {
        setPriceBid(priceBids.current.state.numAsString);
        setOpenModal(true);
        onClose();
    };
    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <ConfirmModel 
            isOpen={openModal}
            onClose={handleClose}
            prod_id={prodId}
            
            price_bid = {priceBid}
            />

            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{justifyContent: 'center',  marginTop: '10%', position:'center'}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đấu giá</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Giá mới</Form.Label>
                            {/* <Form.Control value={priceBid} onChange={(e) => { onChangeHandler(e.target.value) }} type="number" placeholder="vd: 20000" onKeyDown={(evt) => (evt.key === 'e' || evt.key === '-' || evt.key === '+' || evt.key === '.' || evt.key === ',') && evt.preventDefault()} /> */}
                            <NumberFormat
                                variant="standard"
                                thousandSeparator={true}
                                suffix={' VND'}
                                customInput={Form.Control}
                                ref={priceBids}
                            />
                            <Form.Text className="text-muted">
                                Giá của bạn sẽ được bảo mật, người khác sẽ không thể thấy.
                            </Form.Text>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={openModalHandler}>Xác nhận</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Bidding;