import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const activate = () => {
    return (
        <Container>
            <Alert variant='success' className="text-center">
                Account has been created. Please activate your account.
                An activation link has been sent to your Gmail account.
            </Alert>
        </Container>
    );
};

export default activate;