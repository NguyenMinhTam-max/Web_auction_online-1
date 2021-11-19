import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotifyModel({ text, isOpen, onClose }) {
    var Text = text;
    var TextInNotify = []
    if(localStorage.getItem('TextNotifyBid')){
        TextInNotify = localStorage.getItem('TextNotifyBid').split("|");
    }
    const NameProduct = TextInNotify[2] || 0;
    const PriceProduct = TextInNotify[1] || 0;
    const id = TextInNotify[0] || 1;

    const onClickHandle = async () => {
        try {
            onClose();
        } catch (error) {
        }
    };
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
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h4>Tên sản phẩm: {NameProduct}</h4>
                        <p>Đã có người đấu giá thành công</p>
                        <p>Giá Hiện tại: {PriceProduct} VNĐ</p>
                        <p>Click vào link bên dưới để đi đến sản phẩm</p>
                        <Link to={`/details/${id}`}>Đi đến sản phẩm</Link>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="outline-danger" onClick={onClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NotifyModel;