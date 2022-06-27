import React from 'react';
import {Modal, Button} from 'react-bootstrap'

const CsvContent = ({show, onHide, csv}) => {
    return (
        <div>
            <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    CSV Content
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{csv}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CsvContent;