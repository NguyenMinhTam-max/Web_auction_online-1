import { Modal, Button, Form, Alert } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { bidProduct } from '../../reducers/users/bidder';
import { addComments } from '../../reducers/users/profile';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import NotifyModel from './Notify';


function Comment({ isOpen, onClose, prod_id, statusS }) {
    var [textComment, setTextComment] = useState('');
    var prodId = prod_id;
    var status = statusS;
    const [openModalNotify, setOpenModalNotify] = useState(false);
    const [textNotify, setTextNotify] = useState('');
    const dispatch = useDispatch();
    const onChangeHandler = (value) => {
        setTextComment(value);
    };

    const insertHandler = async() => {
        try{
            var result = await dispatch(addComments({ textComment, status, prodId })).unwrap();
            onClose();
            setTextNotify('Đánh giá sản phảm thành công');
            setOpenModalNotify(true);
        }catch(error){
            setTextNotify(error);
            onClose();
            setOpenModalNotify(true);
        }
    };
    const handleCloseNotify = () => {
        setOpenModalNotify(false);
    };

    return (
        <div>
            <NotifyModel
                isOpen={openModalNotify}
                onClose={handleCloseNotify}
                text={textNotify}
            />
            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{justifyContent: 'center',  marginTop: '10%', position:'center'}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đánh giá</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nhận xét</Form.Label>
                            <Form.Control value={textComment} onChange={(e) => { onChangeHandler(e.target.value) }} type="text" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={insertHandler}>Gửi nhân xét</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Comment;