import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const activate = () => {
    return (
        <Container>
            <div className="text-center alert alert-secondary py-5 mt-7" role="alert">
                Account has been created. Please activate your account.
                An activation link has been sent to your Gmail account.
            </div>
        </Container>
    );
};

export default activate;