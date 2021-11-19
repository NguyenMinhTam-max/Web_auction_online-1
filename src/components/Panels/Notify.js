import { Modal, Button, Form, Alert } from 'react-bootstrap';

function Notify({ isOpen, onClose, text }) {
    var Text = text;

    return (
        <div>

            <Modal
                show={isOpen}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
                style={{justifyContent: 'center',  marginTop: '10%', position:'center'}}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>{Text}</Form.Label>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={onClose}>
                            Đóng
                        </Button>                        
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Notify;