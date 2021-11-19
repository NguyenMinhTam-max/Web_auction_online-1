import { Modal, Button, Alert } from 'react-bootstrap';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { bidProduct } from '../../reducers/users/bidder';
import NumberFormat from 'react-number-format';


function ConfirmModel({ isOpen, onClose, prod_id, price_bid }) {
    var priceBid = price_bid;
    var prodId = prod_id;
    const dispatch = useDispatch();
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
    }, [showFailed, showSuccess])

    const onClickHandle = async () => {
        try {
            const check = await dispatch(bidProduct({ priceBid, prodId })).unwrap();
            setText(check.message)
            onClose();
            setShowSuccess(true);
        } catch (error) {
            setText(error)
            setShowFailed(true);
            onClose();
            
        }
    };

    useEffect(() => {
        handleVisible();
    }, [handleVisible]);

    return (
        <div>
            <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>

            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>

            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{ justifyContent: 'center', marginTop: '10%', position: 'center' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn đấu với mức giá này:
                    <NumberFormat
                        value={priceBid}
                        variant="standard"
                        thousandSeparator={true}
                        suffix={' VND'}
                        displayType={'text'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={onClickHandle}>Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmModel;