import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import {fetchData, saveData} from 'src/utils';

const ConfirmAlert = (props) => {
    const {show, onHide, nameField, id, setFormData} = props

    const handleYes = () => {
        const stored = fetchData(nameField)
        const newData = stored.filter(row => row.id !== id)

        saveData(newData, nameField)

        setFormData(newData)

        onHide(false)
    }

    const handleNo = () => {
        onHide(false)
    }

    const style = {
        background: 'deepskyblue', 
        // width: '400px',
        height: '200px',
        textAlign: "center",
        color: 'white',
        padding: '10px',
    }

    const btnStyle = {
        backgroundColor: 'transparent',
        border: '1px solid white',
        width: '150px',
        height: '2rem',
        margin: '1rem',
        color: 'white',
    }

    return (
        <div>
            <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Body>
                <div style={style}>
                    <h1>Are you sure?</h1>
                    <p>You want to delete this file?</p>
                    <button className='bg-secondary' onClick={handleNo} style={btnStyle}>No</button>
                    <button className='bg-primary' onClick={handleYes} style={btnStyle}>
                    Yes, Delete it!
                    </button>
                </div>
            </Modal.Body>

            
            </Modal>
        </div>
    );
};

export default ConfirmAlert;