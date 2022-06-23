import React, {useContext, useEffect, useState} from 'react';
import { Modal, Button, Row, Container } from 'react-bootstrap';
import StyledForm from './style';
import Input from '~components/extra/Input';
import GlobalHeaderContext from 'src/context/GlobalHeaderContext';

const NewRow = (props) => {
    const {singleData, handleChange, show, onHide, handleSubmit, nameField} = props

    const gContext = useContext(GlobalHeaderContext)

    return (
        <>
            <Modal
                // {...props}
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Add Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StyledForm backgroundColor="#f3f4f6">
                        <Container className="position-static">
                            <Row className="align-items-center justify-content-center position-static">
                            <StyledForm.Box>
                                <StyledForm.FromSection>
                                <form>
                                    <Row>
                                        <div className="form-floating col-12 col-lg-6">
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Name"
                                                id="floatinginput5"
                                                onChange={(e) => handleChange(e)}
                                                name={nameField}
                                                defaultValue={singleData?.[nameField]}
                                            />
                                            <label htmlFor="floatinginput5">Item Name</label>
                                        </div>
                                        <div className="form-floating col-12 col-lg-6">
                                            <Input
                                                className="form-control"
                                                type="text"
                                                placeholder="Monthly"
                                                id="floatinginput5"
                                                onChange={(e) => {handleChange(e)}}
                                                name="monthly"
                                                defaultValue={singleData?.monthly}
                                            />
                                            <label htmlFor="floatinginput5">Monthly</label>
                                        </div>
                                    </Row>
                                    {gContext?.validationError?.non_field_errors &&
                                    <div className="custom-alert">
                                        {gContext?.validationError?.non_field_errors.map((item,key)=><><small key={key}>{item}</small><br></br></>)}
                                    </div>
                                    }
                                    <div className="text-center">
                                    <StyledForm.FormButton 
                                        className="btn-primary mt-2" 
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </StyledForm.FormButton>
                                    </div>
                                </form>
                                </StyledForm.FromSection>
                            </StyledForm.Box>
                            </Row>
                        </Container>
                    </StyledForm>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewRow;