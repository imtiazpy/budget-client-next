import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmAlert = (props) => {
    const {show, onHide, nameField, id, setFormData} = props

    const handleYes = () => {
        let stored;
        if (nameField === 'income') {
            stored = JSON.parse(localStorage.getItem('incomeData'))
        } else {
            stored = JSON.parse(localStorage.getItem('expenseData'))
        }

        const newData = stored.filter(row => row.id !== id)

        if (nameField === 'income') {
            localStorage.setItem('incomeData', JSON.stringify(newData))
        } else {
            localStorage.setItem('expenseData', JSON.stringify(newData))
        }
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
                    <button onClick={handleNo} style={btnStyle}>No</button>
                    <button onClick={handleYes} style={btnStyle}>
                    Yes, Delete it!
                    </button>
                </div>
            </Modal.Body>

            
            </Modal>
        </div>
    );
};

export default ConfirmAlert;